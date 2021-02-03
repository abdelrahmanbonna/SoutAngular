import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { FireService } from 'src/app/services/fire.service';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isRecordingVideo: boolean = false;
  urlsVideo: any[] = [];

  styleObject(): Object {
    return { color: this.user.favColor }
  }
  isRecording = false; //audio recorder item
  private record: any; //audio recorder item
  public urls: any[] = []; //audio recorder audios
  private error: any; //audio recorder error
  subscribtion: Subscription[] = [];
  postList: any[] = [];
  LikesList: any[] = [];
  commentsList: any[] = [];
  public post: Post = new Post();
  postMind: string = "";
  postDesc: string = "";
  user: any;
  postcomfields: string[] = [];
  greating: string;
  constructor(private fireService: FireService, private postsService: PostsService, private firestore: AngularFirestore, private route: Router, private domSanitizer: DomSanitizer) {
    this.user = JSON.parse(localStorage.getItem('userdata')!);
    this.greating = "What's up, " + this.user.firstName + " " + this.user.secondName + "?";
    this.subscribtion.push(this.fireService.getCollection('post').subscribe((res) => {
      this.postList = res;
      console.log(res);
      for (let index = 0; index < this.postList.length; index++) {
        this.getComments(this.postList[index].id)
      }
      for (let index = 0; index < this.postList.length; index++) {
        this.getLikes(this.postList[index].id)
      }
    }))

  }

  ngOnInit(): void {
    if (!localStorage.getItem('userdata')) {
      this.route.navigate(['/landing'])
    }
    document.querySelector('.modal-backdrop')!.remove();
    this.subscribtion.push(this.fireService.getCollection('post').subscribe((res) => {
      this.postList = res;
      for (let index = 0; index < this.postList.length; index++) {
        this.getComments(this.postList[index].id)
      }
      for (let index = 0; index < this.postList.length; index++) {
        this.getLikes(this.postList[index].id)
      }
    }))

    console.log(`Likes ${this.LikesList}`)
    console.log(`Comments ${this.commentsList}`)
  }

  async notifyUser(usrId: string, msg: string) {
    let id = this.firestore.createId();
    await this.firestore.collection(`Users`).doc(usrId).collection('notifications').doc(id).set({
      id: id,
      date: new Date().toISOString(),
      description: msg,
      maker: {
        id: this.user.id,
        name: this.user.firstName + " " + this.user.secondName,
        picURL: this.user.picURL
      }
    })
  }

  addPost(desc: string, audio: any = null, video: any = null, images: any[] = []) {
    this.post.description = desc;
    this.post.audio = audio;
    this.post.image = images;
    this.post.video = video;
    this.post.owner.id = this.user.id;
    this.post.owner.name = this.user.firstName + " " + this.user.secondName;
    this.post.owner.picURL = this.user.picURL;
    this.post.id = this.firestore.createId();
    this.postsService.addPost(this.post).then(() => {
      console.log(this.post)
    });
    this.ngOnInit()
  }

  bookmarkpost(post: any) {
    this.firestore.collection("Users").doc(this.user.id).collection("bookmarks").add({
      date: new Date().toISOString(),
      description: post.description ? post.description : undefined,
      id: post.id,
      audio: post.audio ? post.audio : undefined,
      video: post.video ? post.video : undefined,
      talent: post.talent ? post.talent : undefined,
      images: post.images ? post.images : undefined,
      owner: {
        id: post.owner.id,
        name: post.owner.name,
        picURL: post.owner.picURL
      }
    })
    alert(`post added`)
  }

  ngOnDestroy(): void {
    this.subscribtion.forEach(element => {
      element.unsubscribe();
    })
  }

  addLike(postid: any) {
    this.firestore.collection('post').doc(postid.id).collection("like").add({
      userid: this.user.id
    })
    this.notifyUser(postid.owner.id, `${this.user.firstName} liked on your post `)
  }

  addComment(postid: any, index: number) {
    this.firestore.collection(`post`).doc(postid.id).collection('comment').add({
      writer: {
        id: this.user.id,
        name: this.user.firstName + " " + this.user.secondName,
        picURL: this.user.picURL
      },
      description: this.postcomfields[index],
      date: new Date().toISOString(),
    })
    this.notifyUser(postid.owner.id, `${this.user.firstName} commented on your post "${this.postcomfields[index]}"`)
  }

  async getComments(postid: string) {
    this.subscribtion.push(await this.firestore.collection('post').doc(postid).collection('comment').valueChanges().subscribe((data) => {
      this.commentsList.push(data);
      console.log(data)
    }))
  }

  async getLikes(postid: string) {
    this.subscribtion.push(await this.firestore.collection('post').doc(postid).collection('like').valueChanges().subscribe((data) => {
      this.LikesList.push(data)
      console.log(data)
    }))
  }


  startRecording() {
    this.isRecording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }


  startVideoRecording() {
    this.isRecordingVideo = true;
    let mediaConstraints = {
      video: true,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallbackVideo.bind(this), this.errorCallback.bind(this));
  }

  successCallbackVideo(stream: any) {
    var options = {
      mimeType: "video/mp4",
    };

    //Start Actuall Recording
    var MediaStreamRecorder = RecordRTC.MediaStreamRecorder;
    this.record = new MediaStreamRecorder(stream, options);
    this.record.record();
  }

  successCallback(stream: any) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1
    };

    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.isRecording = false;
    this.record.stop(this.processRecording.bind(this));
  }

  stopRecordingVideo() {
    this.isRecordingVideo = false;
    this.record.stop(this.processRecordingVideo.bind(this));
  }

  processRecording(blob: any) {
    this.urls.push(URL.createObjectURL(blob)!);
  }

  processRecordingVideo(blob: any) {
    this.urlsVideo.push(URL.createObjectURL(blob)!);
  }

  sanitize(url: string) {
    console.log(url)
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  errorCallback(error: any) {
    this.error = 'Can not play audio in your browser';
  }


}

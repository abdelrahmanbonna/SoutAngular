import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostsService } from 'src/app/services/posts.service';
import { FireService } from 'src/app/services/fire.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
// <<<<<<< mai
// =======
// import { ISettingsData } from '../../viewModels/isettings-data';
// >>>>>>> master
import { ModeService } from 'src/app/services/mode.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName: string = "";
  picURL: any;
  coverPicURL: string = "";
  public user: User = new User();
  postList: Post[] = [];
  public post: Post = new Post();
  postMind: string = "";
  postDesc: string = "";
  postcomfields: string[] = [];
  LikesList: any[] = [];
  commentsList: any[] = [];
  notificationsNo: number = 0;

  following: number = 0;
  followers: number = 0;

  usersList: User[] = [];

  followersList: any[] = [];
  followingList: any[] = [];

  updatedUser: User = new User();
// <<<<<<< mai

  subscribtion: Subscription[] = [];

  comment: object = {};
  isRecordingVideo: boolean = false;
  urlsVideo: any[] = [];
  checkCover: boolean | undefined;
  updatedPost: object = {};
// =======

//   subscribtion: Subscription[] = [];

//   comment: object = {};
//   isRecordingVideo: boolean = false;
//   urlsVideo: any[] = [];

// >>>>>>> master
  styleObject(): Object {
    return { color: this.user.favColor }
  }
  isRecording = false; //audio recorder item
  private record: any; //audio recorder item
  public urls: any[] = []; //audio recorder audios
  private error: any; //audio recorder error
// <<<<<<< mai
  constructor(private postsService: PostsService, private route: Router,
    private firestore: AngularFirestore, private storage: AngularFireStorage, private FireService: FireService
    , config: NgbModalConfig, private modalService: NgbModal, private modeService: ModeService, private domSanitizer: DomSanitizer, private firestorage: AngularFireStorage,
  ) {
// =======

  // settingsData: ISettingsData = { privateAcc: false, favColor: '', favMode: '', oldPassword: '', deactive: false };

//   constructor(private postsService: PostsService, private route: Router,
//     private firestore: AngularFirestore, private storage: AngularFireStorage, private FireService: FireService
//     , config: NgbModalConfig, private modalService: NgbModal, private modeService: ModeService, private domSanitizer: DomSanitizer, private firestorage: AngularFireStorage,) {
// >>>>>>> master
    this.modalService.dismissAll();
  }



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdata')!)
    if (this.user) {
      this.userName = this.user.firstName + " " + this.user.secondName;
      this.picURL = this.user.picURL;
      this.coverPicURL = this.user.coverPicURL;
// <<<<<<< mai
// =======
      // this.settingsData.favMode = this.user.favMode;
// >>>>>>> master
      this.postMind = "What's on your mind, " + this.user.firstName + "?";

      if (this.user.coverPicURL === "")
        this.checkCover = false;
      else
        this.checkCover = true;
      this.getAllPosts();
      this.getnotificationsno();
      this.getFollowers();
      this.getFollowing();
      console.log(this.user);


      // if (this.settingsData.favMode === "dark") { this.modeService.OnDark(); this.settingsData.favMode = "dark"; }
      // else if (this.settingsData.favMode === "light") { this.modeService.defaultMode(); this.settingsData.favMode = "light"; }

    }
    else
      this.route.navigate(['/landing'])
  }

// <<<<<<< mai
// =======
  // OnDark(){
  //   this.modeService.OnDarkFont(document.querySelectorAll(".nav-item a"),document.querySelectorAll(".darkFont"),document.querySelectorAll("#name"));
  //   this.modeService.OnDarkColumn(document.querySelectorAll("#sidebarMenu")); this.settingsData.favMode="dark";
  // }
  // defaultMode(){
  //   this.modeService.defaultModeColumn(document.querySelectorAll("#sidebarMenu")); this.settingsData.favMode="light";
  //   this.modeService.defaultModeFont(document.querySelectorAll(".nav-item a"),document.querySelectorAll(".darkFont"),document.querySelectorAll("#name"));

  // }
// >>>>>>> master

  uploadFile(event: any, type: string) {
    var filePath: any;
    var userId = this.user.id
    const file = event.target.files[0];

    if (type == "profile")
      filePath = '/Users/profile_pics/' + userId;
    else if (type == "cover")
      filePath = '/Users/cover_photos/' + userId;

    this.storage.upload(filePath, file);
    const ref = this.storage.refFromURL("gs://sout-2d0f6.appspot.com" + filePath);

    ref.getDownloadURL().toPromise().then(url => {
      if (type == "profile") {

        this.user.picURL = url;
        this.FireService.updateDocument("Users/" + userId, this.user)

        this.picURL = url;
        console.log(this.user.picURL)
      }
      else if (type == "cover") {
        this.coverPicURL = url;
        this.FireService.updateDocument("Users/" + userId, this.user)

        this.user.coverPicURL = url;
      }

      localStorage.setItem('userdata', JSON.stringify(this.user))
      this.route.navigate(['/users/profile']).then(() => {
        window.location.reload();
      });
    });

  }

  getAllPosts() {
    this.postsService.getAllUserPosts(this.user.id).subscribe(res => {
      this.postList = res
      for (let index = 0; index < this.postList.length; index++) {
        this.getComments(this.postList[index].id)
      }
      for (let index = 0; index < this.postList.length; index++) {
        this.getLikes(this.postList[index].id)
      }
    });
    // return this.postList;
    //console.log(this.postList)

  }

// <<<<<<< mai
// =======
  // addPost(desc: string) {
  //   this.post.description = desc;
  //   this.post.owner.id = this.user.id;
  //   this.post.owner.name = this.user.firstName + " " + this.user.secondName,
  //     this.post.owner.picURL = this.user.picURL,
  //     this.post.id = this.firestore.createId();
  //   this.postsService.addPost(this.post).then(() => {
  //     console.log(this.post)
  //   });
  //   this.ngOnInit()
  // }

// >>>>>>> master
  addPost(desc: string, audio: any = null, video: any = null, images: any[] = []) {
    this.post.description = desc;
    this.post.owner.id = this.user.id;
    this.post.owner.name = this.user.firstName + " " + this.user.secondName;
    this.post.owner.picURL = this.user.picURL;
    this.post.id = this.firestore.createId();
    this.postsService.addPost(this.post).then(() => {
      console.log(this.post)
    });
// <<<<<<< mai
    this.ngOnInit()
    // this.route.navigate(['/users/profile']).then(() => {
    //   window.location.reload();
    // });
// =======
//     this.ngOnInit();
//     this.route.navigate(['/users/profile']).then(() => {
//       window.location.reload();
//     });
// >>>>>>> master
  }

  deletePost(id: string) {
    this.postsService.deletePost(id).then(
      (data) => {
        console.log(data);

        this.ngOnInit();

      })

  }

  addLike(postid: any) {
    this.firestore.collection('post').doc(postid.id).collection("like").add({
      userid: this.user.id
    });

    this.subscribtion.push(this.firestore.collection('post').doc(postid.id).collection('like').valueChanges().subscribe((data) => {
      this.LikesList[this.postList.findIndex((post)=>post == postid)] = data;
    }));

    this.notifyUser(postid.owner.id, `${this.user.firstName} liked on your post `)
  }

// <<<<<<< mai
  addComment(postid: any, index: number) {
    this.firestore.collection(`post`).doc(postid.id).collection('comment').add({
// =======
//   addComment(post: any, index: number) {
//     var commentId = this.firestore.createId();
//     this.comment = {
//       id: commentId,
// >>>>>>> master
      writer: {
        id: this.user.id,
        name: this.user.firstName + " " + this.user.secondName,
        picURL: this.user.picURL
      },
      description: this.postcomfields[index],
      date: new Date().toISOString(),
// <<<<<<< mai
    })
// =======
//     }
//     this.FireService.setDocument("/post/" + post.id + "/comment/" + commentId, { ...this.comment });
//     this.notifyUser(post.owner.id, `${this.user.firstName} commented on your post "${this.postcomfields[index]}"`)
//   }
// >>>>>>> master

    //this.getComments(postid)
    this.subscribtion.push(this.firestore.collection('post').doc(postid.id).collection('comment').valueChanges().subscribe((data) => {
      this.commentsList[this.postList.findIndex((post)=>post == postid)] = data;
    }));

    this.notifyUser(postid.owner.id, `${this.user.firstName} commented on your post "${this.postcomfields[index]}"`)
  }
  async getComments(postid: string) {
    // this.commentsList = []
    this.subscribtion.push(await this.firestore.collection('post').doc(postid).collection('comment').valueChanges().subscribe((data) => {
      this.commentsList.push(data);
      // console.log(data)
    }))
  }

  async getLikes(postid: string) {
    this.subscribtion.push(await this.firestore.collection('post').doc(postid).collection('like').valueChanges().subscribe((data) => {
      this.LikesList.push(data)
    }))
  }

  async notifyUser(usrId: string, msg: string) {
    await this.firestore.collection(`Users`).doc(usrId).collection('notifications').add({
      date: new Date().toISOString(),
      description: msg,
      seen: false,
      maker: {
        id: this.user.id,
        name: this.user.firstName + " " + this.user.secondName,
        picURL: this.user.picURL
      }
    })
  }

  getnotificationsno() {
    this.firestore.collection('Users').doc(this.user.id).collection('notifications').valueChanges().subscribe((data) => {
      console.log(`notifications: ${data}`)
      this.notificationsNo = data.length
    })
  }

  getFollowers() {
    this.followersList = []
    this.subscribtion.push(this.firestore.collection(`Users`).doc(this.user.id).collection('followers').valueChanges().subscribe((data) => {
      this.followers = data.length
      data.forEach(el => {
        this.followersList.push(el);
      })
    })
    )

  }

  getFollowing() {
    this.followingList = []
    this.subscribtion.push(this.firestore.collection(`Users`).doc(this.user.id).collection('following').valueChanges().subscribe((data) => {
      this.following = data.length
      data.forEach(el => {
        this.followingList.push(el);
      })

    })
    )
    console.log(this.followingList)

  }

  changeName(name: string) {
    var splittedName = name.split(" ");
    this.user.firstName = splittedName[0];
    this.user.secondName = (splittedName[1]) ? splittedName[1] : "";
    // this.user.firstName = name
    this.FireService.updateDocument("Users/" + this.user.id, this.user);

    this.postList.forEach(el => {
      el.owner.name = name;
      this.FireService.updateDocument("post/" + el.id, el);

      // this.getComments(el.id);
      // console.log(this.commentsList)
      // this.commentsList.forEach(element => {
      //   element.forEach((x:any) => {
      //     x.writer.name = name;
      //     this.FireService.updateDocument("/post/" + el.id + "/comment/" + element.id, x);
      //   })

      // })
    });


    // this.getAllUsers();

    // this.usersList.forEach(el => {
    //   this.FireService.getCollection("Users/" + el.id + "/followers/").subscribe(res => {
    //     res.forEach(element => {
    //       if (element.userid == this.user.id) {
    //         element.name = name;
    //       }
    //     })
    //   });
    // });

    console.log(this.postList)

    localStorage.setItem('userdata', JSON.stringify(this.user));
    this.ngOnInit()
  }

  getUserById(id: string) {
    this.FireService.getDocument("Users/" + id).subscribe(res => {
      this.updatedUser = res
      console.log(this.updatedUser)
    });
  }

  getAllUsers() {
    this.FireService.getCollection("Users/").subscribe(res => {
      this.usersList = res
      console.log(this.usersList)
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  ngOnDestroy(): void {
    this.subscribtion.forEach(element => {
      element.unsubscribe();
    })
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
    // console.log(url)
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  errorCallback(error: any) {
    this.error = 'Can not play audio in your browser';
  }

  async uploadFile2(event: any, type: string) {
    var filePath: any;
    const file = event.target.files[0];
    const id = this.firestore.createId()
    if (type == "image")
      filePath = '/post/images/' + id;
    else if (type == "audio")
      filePath = '/post/audio/' + id;
    else if (type == "video")
      filePath = '/post/video/' + id;
    await this.firestorage.upload(filePath, file);
    const ref = this.firestorage.refFromURL("gs://sout-2d0f6.appspot.com" + filePath).getDownloadURL().toPromise().then((url => {
      console.log(url);
      if (type == "image") {
        this.post.image = url
      } else if (type == "audio") {
        this.post.audio = url
      } else if (type == "video") {
        this.post.video = url
      }
      console.log(url)
    }));
    alert('upload done')
    // });
  }

  bookmarkpost(post: any) {
    this.firestore.collection("Users").doc(this.user.id).collection("bookmarks").add({
      post: this.firestore.collection("post").doc(post.id).ref,
    })
    alert(`post added`)
  }


  editInfo(bio: string, mobile: string, birthDate: Date) {
    this.user.bio = bio;
    this.user.mobile = mobile;
    this.user.birthDate = birthDate;
    this.FireService.updateDocument("Users/" + this.user.id, this.user);
    localStorage.setItem('userdata', JSON.stringify(this.user));

    // this.route.navigate(['/users/profile']).then(() => {
    //   window.location.reload();
    // });
  }

  editPostFun(desc: string, postId: string,post:Post) {
    post.description = desc;
    console.log(post)
    this.FireService.updateDocument(`post/${postId}`, post);;

    console.log(this.post)
    // this.ngOnInit()
    // this.route.navigate(['/users/profile']).then(() => {
    //       window.location.reload();
    //     });
  }

  async uploadFileEdit(event: any, type: string,post:Post) {
    var filePath: any;
    const file = event.target.files[0];
    const id = this.firestore.createId()
    if (type == "image")
      filePath = '/post/images/' + id;
    else if (type == "audio")
      filePath = '/post/audio/' + id;
    else if (type == "video")
      filePath = '/post/video/' + id;
    await this.firestorage.upload(filePath, file);
    const ref = this.firestorage.refFromURL("gs://sout-2d0f6.appspot.com" + filePath).getDownloadURL().toPromise().then((url => {
      console.log(url);
      if (type == "image") {
        post.image = url
      } else if (type == "audio") {
        post.audio = url
      } else if (type == "video") {
        post.video = url
      }
      console.log(url)
    }));
    alert('upload done')
    // });
  }

  openEdit(content: any) {
    this.modalService.open(content, {
      size: 'lg'
    });
  }
  


}

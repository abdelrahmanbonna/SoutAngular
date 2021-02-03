import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostsService } from 'src/app/services/posts.service';
import { FireService } from 'src/app/services/fire.service';

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

  constructor(private postsService: PostsService, private route: Router,
    private firestore: AngularFirestore, private storage: AngularFireStorage, private FireService: FireService) {

  }



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdata')!)
    if (this.user) {
      this.userName = this.user.firstName + " " + this.user.secondName;
      this.picURL = this.user.picURL;
      this.coverPicURL = this.user.coverPicURL;

      this.postMind = "What's on your mind, " + this.user.firstName + "?";
      this.getAllPosts();
    }
    else
      this.route.navigate(['/landing'])
  }
  
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
    console.log(this.postList)

  }

  addPost(desc: string) {
    this.post.description = desc;
    this.post.owner.id = this.user.id;
    this.post.owner.name = this.user.firstName + " " + this.user.secondName,
      this.post.owner.picURL = this.user.picURL,
      this.post.id = this.firestore.createId();
    this.postsService.addPost(this.post).then(() => {
      console.log(this.post)
    });
    this.ngOnInit()
  }

  deletePost(id: string) {
    this.postsService.deletePost(id).then(
      (data) => {
        console.log(data);

        this.ngOnInit();

      })

  }

  addLike(postid: string) {
    this.firestore.collection('post').doc(postid).collection("like").add({
      userid: this.user.id
    })
    this.notifyUser(postid, `${this.user.firstName} liked on your post `)
  }

  addComment(postid: string, index: number) {
    this.firestore.collection(`post`).doc(postid).collection('comment').add({
      writer: {
        id: this.user.id,
        name: this.user.firstName + " " + this.user.secondName,
        picURL: this.user.picURL
      },
      description: this.postcomfields[index],
      date: new Date().toISOString(),
    })
    this.notifyUser(postid, `${this.user.firstName} commented on your post ${this.postcomfields[index]}`)
  }

  async getComments(postid: string) {
    await this.firestore.collection('post').doc(postid).collection('comment').valueChanges().subscribe((data) => {
      this.commentsList.push(data);
      console.log(data)
    })
  }

  async getLikes(postid: string) {
    await this.firestore.collection('post').doc(postid).collection('like').valueChanges().subscribe((data) => {
      this.LikesList.push(data)
      console.log(data)
    })
  }

  async notifyUser(usrId: string, msg: string) {
    await this.firestore.collection(`Users`).doc(usrId).collection('notifications').add({
      date: new Date().toISOString(),
      description: msg,
      maker: {
        id: this.user.id,
        name: this.user.firstName + " " + this.user.secondName,
        picURL: this.user.picURL
      }
    })
  }

}

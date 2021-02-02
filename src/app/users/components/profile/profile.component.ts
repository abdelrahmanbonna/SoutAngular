import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostsService } from 'src/app/services/posts.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName: string = "";
  picURL: string = "";
  coverPicURL: string = "";
  public user: User = new User();
  postList: Post[] = [];
  public post: Post = new Post();
  postMind: string = "";
  postDesc: string = "";

  constructor(private postsService: PostsService, private route: Router, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdata')!)
    if (this.user) {
      // console.log(this.usrInfo.loggedin)
      this.userName = this.user.firstName + " " + this.user.secondName;
      this.picURL = this.user.picURL;
      this.coverPicURL = this.user.coverPicURL;
      this.postMind = "What's on your mind, " + this.user.firstName + "?";
      this.getAllPosts();
    }
    else
      this.route.navigate(['/landing'])
  }

  getAllPosts() {
    this.postsService.getAllUserPosts(this.user).subscribe(res => {
      this.postList = res
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

}

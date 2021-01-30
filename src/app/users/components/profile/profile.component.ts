import { Component, OnInit } from '@angular/core';
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

  constructor(private usrInfo: UserInfoService, private postsService: PostsService, private route: Router) { }

  ngOnInit(): void {
    if (this.usrInfo.loggedin) {
      this.user = this.usrInfo.user;
      // console.log(this.usrInfo.loggedin)
      this.userName = this.user.firstName + " " + this.user.secondName;
      this.picURL = this.user.picURL;
      this.coverPicURL = this.user.coverPicURL;

      this.getAllPosts();

    }
    else
      this.route.navigate(['/landing'])
  }

  async getAllPosts() {
    await this.postsService.getAllUserPosts(this.user).then((pstList) => {
      this.postList = pstList;
    }).catch((err) => {
      console.log(err)
    })
  }

  addPost() {
    this.postsService.addPost(this.post)
    this.route.navigate(['/users/profile'])
  }

}

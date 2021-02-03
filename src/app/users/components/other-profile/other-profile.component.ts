import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { FireService } from 'src/app/services/fire.service';
import { PostsService } from 'src/app/services/posts.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class OtherProfileComponent implements OnInit {
  userId: string | null = "";
  user: User = new User();
  postList: Post[] = [];
  userInfo: User = new User();
  ownerId: string = "";
  postMind: string = "";
  report: Report | any = new Report();
  postcomfields: string[] = [];
  LikesList: any[] = [];
  commentsList: any[] = [];
  picURL: any;
  coverPicURL: string = "";

  constructor(private postsService: PostsService, private activatedRoute: ActivatedRoute,
    private router: Router, private FireService: FireService, config: NgbModalConfig, private modalService: NgbModal
    , private firestore: AngularFirestore) {

    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('userdata')!)
    if (this.user) {

      this.picURL = this.user.picURL;
      this.activatedRoute.paramMap.subscribe((params) => {
        let UIDParam: string | null = params.get('UID');
        this.userId = UIDParam;

        if (this.userId == this.user.id)
          this.router.navigate(['/users/profile'])
        else {
          this.getUserById(this.userId!)
          this.getAllPosts();

        }
      });
    }
    else
      this.router.navigate(['/landing'])


  }

  getUserById(id: string) {

    this.FireService.getDocument("Users/" + id).subscribe(res => {
      this.userInfo = res
      console.log(this.userInfo)
      this.postMind = "Write something to " + this.userInfo.firstName + " ..."
    });
  }

  getAllPosts() {
    this.postsService.getAllUserPosts(this.userId!).subscribe(res => {
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

  open(content: any) {
    this.modalService.open(content);
  }

  reportUser(title: string, des: string) {

    this.report.title = title;
    this.report.description = des;
    this.report.userId = this.user.id;
    this.report.reportedId = this.userInfo.id;
    this.report.type = "user";
    this.report.id = this.firestore.createId();
    this.FireService.setDocument("/Reports/" + this.report.id, { ...this.report });
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


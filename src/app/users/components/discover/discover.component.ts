import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { Talent } from 'src/app/models/talent.model';
import { User } from 'src/app/models/user.model';
import { PostsService } from 'src/app/services/posts.service';
import { TalentService } from 'src/app/services/talent.service';
import { FireService } from 'src/app/services/fire.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Report } from 'src/app/models/report.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  public user: User = new User();
  talentList: Talent[] = [];
  postList: Post[] = [];
  userInfo: User = new User();
  ownerId: string = "";
  userList: User[] = [];
  report: Report | any = new Report();

  picURL: any;
  coverPicURL: string = "";

  id: string = "";
  toggle: boolean = false;

  postcomfields: string[] = [];
  LikesList: any[] = [];
  commentsList: any[] = [];

  constructor(private talentService: TalentService, private route: Router, private postsService: PostsService
    , private FireService: FireService
    , config: NgbModalConfig, private modalService: NgbModal
    , private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdata')!)
    if (this.user) {
      this.picURL = this.user.picURL;
      this.coverPicURL = this.user.coverPicURL;

      this.getAllTalents();
      this.getAllPosts();
    }
    else
      this.route.navigate(['/landing'])
  }

  getAllTalents() {

    this.talentService.getAllTalents().subscribe(res => {
      this.talentList = res

      console.log(this.talentList)
    });

  }


  getPostsByTalent(id: string) {
    this.postList = []
    this.LikesList= []
    this.commentsList=[]
    this.postsService.getPostsOfTalent(id).subscribe(res => {
      this.postList = res

      for (let index = 0; index < this.postList.length; index++) {
        this.getComments(this.postList[index].id)
      }
      for (let index = 0; index < this.postList.length; index++) {
        this.getLikes(this.postList[index].id)
      }

      this.postList.forEach(p => {
        this.getUserById(p.owner.id)
      });
      console.log(this.postList)
    });

  }

  getAllPosts() {
    this.postList = []
    this.LikesList= []
    this.commentsList=[]
    this.FireService.getCollection("post/").subscribe(res => {
      this.postList = res

      for (let index = 0; index < this.postList.length; index++) {
        this.getComments(this.postList[index].id)
      }
      for (let index = 0; index < this.postList.length; index++) {
        this.getLikes(this.postList[index].id)
      }

      this.postList.forEach(p => {
        this.getUserById(p.owner.id)
      });

    });
    console.log(this.userList)
  }

  getUserById(id: string) {
    this.userList = []
    this.FireService.getDocument("Users/" + id).subscribe(res => {
      this.userList.push(res)
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  reportUser(title: string, des: string, postId: string) {

    this.report.title = title;
    this.report.description = des;
    this.report.userId = this.user.id;
    this.report.reportedId = postId;
    this.report.type = "post";
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

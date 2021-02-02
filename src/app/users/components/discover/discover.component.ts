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

  id: string = "";
  toggle :boolean= false;

  constructor(private talentService: TalentService, private route: Router, private postsService: PostsService
    , private FireService: FireService
    , config: NgbModalConfig, private modalService: NgbModal
    , private firestore: AngularFirestore) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdata')!)
    if (this.user) {
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
    this.postList=[]
    this.postsService.getPostsOfTalent(id).subscribe(res => {
      this.postList = res

      this.postList.forEach(p => {
        this.getUserById(p.owner)
      });
      console.log(this.postList)
    });

  }

  getAllPosts() {

    this.FireService.getCollection("post/").subscribe(res => {
      this.postList = res

      this.postList.forEach(p => {
        this.getUserById(p.owner)
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


}

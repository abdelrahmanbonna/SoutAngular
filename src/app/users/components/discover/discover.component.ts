import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { Talent } from 'src/app/models/talent.model';
import { User } from 'src/app/models/user.model';
import { PostsService } from 'src/app/services/posts.service';
import { TalentService } from 'src/app/services/talent.service';
import { FireService } from 'src/app/services/fire.service';
import { finalize } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Report } from 'src/app/models/report.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModeService } from 'src/app/services/mode.service';
import { ISettingsData } from '../../viewModels/isettings-data';

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
  subscribtion: Subscription[] = [];
  reportImageURL: string = "";
  uploadPercent: Observable<number> | any;
  downloadURL: Observable<string> | any;
  uploaded: string = "";
  imageReStatus: string = "Choose Image";
  settingsData: ISettingsData = { privateAcc: false, favColor: '', favMode: '', oldPassword: '', deactive: false };

  constructor(private talentService: TalentService, private route: Router, private postsService: PostsService
    , private FireService: FireService
    , config: NgbModalConfig, private modalService: NgbModal
    , private firestore: AngularFirestore, private storage: AngularFireStorage, private modeService: ModeService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdata')!)
    if (this.user) {
      this.picURL = this.user.picURL;
      this.coverPicURL = this.user.coverPicURL;

      this.settingsData.favMode = this.user.favMode;
      if (this.settingsData.favMode === "dark") { this.modeService.OnDark(); this.settingsData.favMode = "dark"; }
      else if (this.settingsData.favMode === "light") { this.modeService.defaultMode(); this.settingsData.favMode = "light"; }

      this.getAllTalents();
      this.getAllPosts();
    }
    else
      this.route.navigate(['/landing'])
  }

  // OnDark() {
  //   this.modeService.OnDarkFont( document.querySelectorAll("#discover"));
  //   this.settingsData.favMode = "dark";
  // }
  // defaultMode() {
  //   this.settingsData.favMode = "light";
  //   this.modeService.defaultModeFont( document.querySelectorAll("#discover"));

  // }
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

  addLike(post: any) {
    this.firestore.collection('post').doc(post.id).collection("like").add({
      userid: this.user.id
    })
    this.notifyUser(post.owner.id, `${this.user.firstName} liked on your post `)
  }

  addComment(post: any, index: number) {
    this.firestore.collection(`post`).doc(post.id).collection('comment').add({
      writer: {
        id: this.user.id,
        name: this.user.firstName + " " + this.user.secondName,
        picURL: this.user.picURL
      },
      description: this.postcomfields[index],
      date: new Date().toISOString(),
    })
    this.notifyUser(post.owner.id, `${this.user.firstName} commented on your post "${this.postcomfields[index]}"`)
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

  ngOnDestroy(): void {
    this.subscribtion.forEach(element => {
      element.unsubscribe();
    })
  }
  
  //************** For Report ********************
  
  uploadReportImage(event: any) {
    var filePath: any;
    const file = event.target.files[0];
    var imageId = this.firestore.createId();

    filePath = '/Reports/images/' + imageId;

    const task = this.storage.upload(filePath, file);
    const ref = this.storage.refFromURL("gs://sout-2d0f6.appspot.com" + filePath);

    this.imageReStatus = ""
    this.uploaded = `Uploading..`

    task.snapshotChanges().pipe(
      finalize(() => {
        this.uploaded = `Image Uploaded`;
        this.imageReStatus = file.name

        const downloadURL = ref.getDownloadURL();
        downloadURL.subscribe(url => {
          this.reportImageURL = url
          console.log(this.reportImageURL)
        })

      })
    )
      .subscribe()

  }

  reportPost(title: string, des: string, postId: string) {

    this.report.title = title;
    this.report.description = des;
    this.report.userId = this.user.id;
    this.report.reportedId = postId;
    this.report.type = "post";
    this.report.id = this.firestore.createId();
    this.report.image = this.reportImageURL;
    this.FireService.setDocument("/Reports/" + this.report.id, { ...this.report });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  bookmarkpost(post: any) {
    this.firestore.collection("Users").doc(this.user.id).collection("bookmarks").add({
      post: this.firestore.collection("post").doc(post.id).ref,
    })
    alert(`post added`)
  }

}

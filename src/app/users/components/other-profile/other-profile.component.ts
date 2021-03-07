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
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';

import { Subscription } from 'rxjs';
import { ISettingsData } from '../../viewModels/isettings-data';
import { ModeService } from 'src/app/services/mode.service';

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
  reportImageURL: string = "";

  uploadPercent: Observable<number> | any;
  downloadURL: Observable<string> | any;
  uploaded: string = "";
  imageReStatus: string = "Choose Image";
  notificationsNo: number = 0;
  check: boolean | undefined;
  checkFollower: boolean = false;

  following: number = 0;
  followers: number = 0;
  followersList: any[] = [];
  followingList: any[] = [];

  subscribtion: Subscription[] = [];
  settingsData: ISettingsData = { privateAcc: false, favColor: '', favMode: '', oldPassword: '', deactive: false };
  
  constructor(private postsService: PostsService, private activatedRoute: ActivatedRoute,
    private router: Router, private FireService: FireService, config: NgbModalConfig, private modalService: NgbModal
    , private firestore: AngularFirestore, private storage: AngularFireStorage, private modeService: ModeService) {

    config.backdrop = 'static';
    config.keyboard = false;
    this.modalService.dismissAll();
  }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('userdata')!)
    if (this.user) {

      this.picURL = this.user.picURL;
      this.settingsData.favMode = this.user.favMode;
      if (this.settingsData.favMode === "dark") { this.OnDark(); this.settingsData.favMode = "dark"; }
      else if (this.settingsData.favMode === "light") { this.defaultMode(); this.settingsData.favMode = "light"; }

      this.activatedRoute.paramMap.subscribe((params) => {
        let UIDParam: string | null = params.get('UID');
        this.userId = UIDParam;


        if (this.userId == this.user.id)
          this.router.navigate(['/users/profile'])
        else {
          this.getUserById(this.userId!)
          this.getAllPosts();
          this.getnotificationsno();
          this.getFollowers();
          this.getFollowing();
          // if(this.check)
          // this.checkFollower=false;

        }
      });
    }
    else
      this.router.navigate(['/landing'])
  }

  OnDark() {
    this.modeService.OnDarkFont(document.querySelectorAll(".nav-item a"), document.querySelectorAll(".darkFont"), document.querySelectorAll("#name"));
    this.modeService.OnDarkColumn(document.querySelectorAll("#sidebarMenu")); this.settingsData.favMode = "dark";
  }
  defaultMode() {
    this.modeService.defaultModeColumn(document.querySelectorAll("#sidebarMenu")); this.settingsData.favMode = "light";
    this.modeService.defaultModeFont(document.querySelectorAll(".nav-item a"), document.querySelectorAll(".darkFont"), document.querySelectorAll("#name"));

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

  follow() {
    if (this.check) {
      console.log("You already follow this user")
      this.checkFollower=true;
    } else {
      this.FireService.setDocument("/Users/" + this.userInfo.id + "/followers/" + this.user.id, {
        userid: this.user.id,
        name: this.user.firstName + " " + this.user.secondName,
        picURL: this.user.picURL
      });
      this.FireService.setDocument("/Users/" + this.user.id + "/following/" + this.userInfo.id, {
        userid: this.userInfo.id,
        name: this.userInfo.firstName + " " + this.userInfo.secondName,
        picURL: this.userInfo.picURL
      })
      this.notifyUser(this.userInfo.id, `${this.user.firstName} followed You!`)
      this.check = true;
    }

  }

  getFollowers() {
    this.followersList = []
    this.subscribtion.push(this.firestore.collection(`Users`).doc(this.userId!).collection('followers').valueChanges().subscribe((data) => {
      this.followers = data.length
      data.forEach(el => {
        this.followersList.push(el);
      })
    }))
    console.log(this.followersList)

  }

  getFollowing() {
    this.followingList = []
    this.subscribtion.push(this.firestore.collection(`Users`).doc(this.userId!).collection('following').valueChanges().subscribe((data) => {
      this.following = data.length
      data.forEach(el => {
        this.followingList.push(el);
      })
    }))

  }

  async getComments(postid: string) {
    this.subscribtion.push(await this.firestore.collection('post').doc(postid).collection('comment').valueChanges().subscribe((data) => {
      this.commentsList.push(data);
      console.log(data)
    })
    )
  }

  async getLikes(postid: string) {
    this.subscribtion.push(await this.firestore.collection('post').doc(postid).collection('like').valueChanges().subscribe((data) => {
      this.LikesList.push(data)
      console.log(data)
    })
    )
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
    this.subscribtion.push(this.firestore.collection('Users').doc(this.user.id).collection('notifications').valueChanges().subscribe((data) => {
      console.log(`notifications: ${data}`)
      this.notificationsNo = data.length
    })
    )
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

  reportUser(title: string, des: string) {

    this.report.title = title;
    this.report.description = des;
    this.report.userId = this.user.id;
    this.report.reportedId = this.userInfo.id;
    this.report.type = "user";
    this.report.id = this.firestore.createId();
    this.report.image = this.reportImageURL;
    this.FireService.setDocument("/Reports/" + this.report.id, { ...this.report });
  }

  bookmarkpost(post: any) {
      this.firestore.collection("Users").doc(this.user.id).collection("bookmarks").add({
        post: this.firestore.collection("post").doc(post.id).ref,
      })
      alert(`post added`)
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
  ngOnDestroy(): void {
    this.subscribtion.forEach(element => {
      element.unsubscribe();
    })
  }

}


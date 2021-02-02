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

  constructor(private postsService: PostsService, private route: Router,
     private firestore: AngularFirestore,private storage : AngularFireStorage, private FireService: FireService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdata')!)
    if (this.user) {
      // console.log(this.usrInfo.loggedin)
      this.userName = this.user.firstName + " " + this.user.secondName;

      // const ref = this.storage.refFromURL(this.user.picURL);
      // this.picURL = ref.getDownloadURL();
      this.picURL = this.user.picURL;

      this.coverPicURL = this.user.coverPicURL;
      this.postMind = "What's on your mind, " + this.user.firstName + "?";
      this.getAllPosts();
    }
    else
      this.route.navigate(['/landing'])
  }

  getAllPosts() {
    this.postsService.getAllUserPosts(this.user.id).subscribe(res => {
      this.postList = res
    });
    // return this.postList;
    console.log(this.postList)

  }

  addPost(desc: string) {
    this.post.description = desc;
    this.post.owner = this.user.id;
    this.post.id = this.firestore.createId();
    this.postsService.addPost(this.post).then(() => {
      console.log(this.post)
    });
    this.ngOnInit()
  }

  deletePost(id: string) {
    this.postsService.deletePost(id).then( 
      (data) =>{
        console.log(data);

        this.ngOnInit();

      }) 
  }

  // updateProfilePic(pic:string){
  //   this.storage.upload("/Users/profile_pics",pic)
    
  //   this.user.picURL = pic;
  //   this.FireService.updateDocument("Users/" + this.user.id,this.user)
  // }

  uploadFile(event:any) {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const task = this.storage.upload(filePath, file);
  }

}

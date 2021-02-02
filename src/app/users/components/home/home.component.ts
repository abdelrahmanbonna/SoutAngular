import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { FireService } from 'src/app/services/fire.service';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  styleObject(): Object {
    return { color: this.user.favColor }
  }

  subscribtion: Subscription[] = [];
  postList: any[] = [];
  public post: Post = new Post();
  postMind: string = "";
  postDesc: string = "";
  user: any;
  postcomfields: string[] = [];
  greating: string;
  constructor(private fireService: FireService, private postsService: PostsService, private firestore: AngularFirestore, private route: Router) {
    this.user = JSON.parse(localStorage.getItem('userdata')!);
    this.greating = "What's up, " + this.user.firstName + " " + this.user.secondName + "?";
    this.subscribtion.push(this.fireService.getCollection('post').subscribe((res) => {
      this.postList = res;
    }))

  }

  ngOnInit(): void {
    if (!localStorage.getItem('userdata')) {
      this.route.navigate(['/landing'])
    }
    document.querySelector('.modal-backdrop')!.remove();
    this.subscribtion.push(this.fireService.getCollection('post').subscribe((res) => {
      this.postList = res;
    }))

  }

  notifyUser(usrId: string, msg: string) {
    this.firestore.collection(`Users`).doc(usrId).collection('notifications').add({
      date: new Date().toISOString(),
      description: msg,
      maker: {
        id: this.user.id,
        name: this.user.firstName + " " + this.user.secondName,
        picURL: this.user.picURL
      }
    })
  }

  addPost(desc: string, audio: any = null, images: any[] = []) {
    this.post.description = desc;
    this.post.owner.id = this.user.id;
    this.post.owner.name = this.user.firstName + " " + this.user.secondName;
    this.post.owner.picURL = this.user.picURL;
    this.post.id = this.firestore.createId();
    this.postsService.addPost(this.post).then(() => {
      console.log(this.post)
    });
    this.ngOnInit()
  }

  bookmarkpost(post: any) {
    this.firestore.collection("Users").doc(this.user.id).collection("bookmarks").add({
      date: new Date().toISOString(),
      description: post.description ? post.description : undefined,
      id: post.id,
      audio: post.audio ? post.audio : undefined,
      video: post.video ? post.video : undefined,
      talent: post.talent ? post.talent : undefined,
      images: post.images ? post.images : undefined,
      owner: {
        id: post.owner.id,
        name: post.owner.name,
        picURL: post.owner.picURL
      }
    })
    alert(`post added`)
  }

  ngOnDestroy(): void {
    this.subscribtion.forEach(element => {
      element.unsubscribe();
    })
  }


  addLike(postid: string) {
    this.firestore.collection('post').doc(postid).collection("like").add({
      userid: this.user.id
    })
  }

  async addComment(postid: string, index: number) {
    await this.firestore.collection(`post`).doc(postid).collection('comment').add({
      writer: {
        id: this.user.id,
        name: this.user.firstName + " " + this.user.secondName,
        picURL: this.user.picURL
      },
      description: this.postcomfields[index],
      date: new Date().toISOString(),
    })


  }

}

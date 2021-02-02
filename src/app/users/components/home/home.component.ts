import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { FireService } from 'src/app/services/fire.service';
import { PostsService } from 'src/app/services/posts.service';
import { UserInfoService } from 'src/app/services/user-info.service';
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
  postsUsers: any[] = [];
  public post: Post = new Post();
  postMind: string = "";
  postDesc: string = "";
  user: any;
  postcomfields: string[] = [];
  greating: string;
  constructor(private fireService: FireService, private postsService: PostsService, private firestore: AngularFirestore, private usrInfo: UserInfoService, private route: Router) {
    this.user = JSON.parse(localStorage.getItem('userdata')!);
    console.log(this.user)
    this.greating = "What's up, " + this.user.firstName + " " + this.user.secondName + "?";
    this.subscribtion.push(this.fireService.getCollection('post').subscribe((res) => {
      console.log(res)
      this.postList = res;
      this.postList.forEach(element => {
        this.getPostUser(element.owner);
        console.log(this.postsUsers)
      });
    }))

  }

  ngOnInit(): void {
    if (!localStorage.getItem('userdata')) {
      this.route.navigate(['/landing'])
    }
    document.querySelector('.modal-backdrop')!.remove();
    this.subscribtion.push(this.fireService.getCollection('post').subscribe((res) => {
      console.log(res)
      this.postList = res;
      this.postList.forEach(element => {
        this.getPostUser(element.owner);
      });
    }))

  }

  notifyUser(usrId: string, msg: string) {
    // this.subscribtion.push(this.fireService.getDocument(`Users/${usrId}`).subscribe(data => {
    //   console.log(`entered notify`)
    //   data.notifications.push({
    //     description: msg,
    //     maker: {
    //       id: this.user.id,
    //       name: this.user.firstName + " " + this.user.secondName,
    //       picURL: this.user.picURL
    //     },
    //     date: new Date().toISOString()
    //   })
    //   this.fireService.updateDocument(`Users/${usrId}`, {
    //     notifications: data.notifications
    //   })
    // }))

    // setTimeout(() => {
    //   this.subscribtion[this.subscribtion.length - 1].unsubscribe()
    // }
    //   , 10);

    // this.fireService.updateDocument(`Users/${usrId}`, {
    //   notifications: [ {
    //     description: msg,
    //     maker: {
    //       id: this.user.id,
    //       name: this.user.firstName + " " + this.user.secondName,
    //       picURL: this.user.picURL
    //     },
    //     date: new Date().toISOString()
    //   }]
    // })
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

  bookmarkpost(id: string) {
    this.user.bookmarks.push(id)
    this.fireService.updateDocument(`Users/${this.user.id}`, {
      bookmarks: this.user.bookmarks,
    })
    alert(`post added`)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribtion.forEach(element => {
      element.unsubscribe();
    })
  }

  getPostUser(id: string) {
    this.fireService.getDocument(`Users/${id}`).subscribe((data) => {
      console.log(data)
      this.postsUsers.push(data);
    })
  }

  addLike(postid: string) {
    let bol = false
    let post: string
    let owner: any
    this.subscribtion.push(this.fireService.getDocument(`post/${postid}`).subscribe((data) => {
      data.like.forEach((element: string) => {
        if (element === this.user.id) {
          bol = true;
        }
      });
      if (!bol)
        data.like.push(this.user.id)
      this.fireService.updateDocument(`post/${postid}`, {
        like: data.like
      })

      owner = data.owner;
      post = data.description;
    }))

    setTimeout(() => {
      this.subscribtion[this.subscribtion.length - 1].unsubscribe()
    }
      , 100);

    // this.notifyUser(owner!, `${this.user.firstName} liked your post ${post!}`)
  }

  async addComment(postid: string, index: number) {
    // let post: string
    // let owner: any
    // this.subscribtion.push(this.fireService.getDocument(`post/${postid}`).subscribe(data => {
    //   console.log(`Data from addcmt ${data}`)
    //   data.comment.push({
    //     writer: {
    //       id: this.user.id,
    //       name: this.user.firstName + " " + this.user.secondName,
    //       picURL: this.user.picURL
    //     },
    //     description: this.postcomfields[index],
    //     date: new Date().toISOString(),
    //   })

    //   this.fireService.updateDocument(`post/${postid}`, {
    //     comment: data.comment
    //   })

    // if (data.owner !== this.user.id)
    // this.notifyUser(data.owner, `${this.user.firstName} commented your post ${data.description}`)

    // }))


    // setTimeout(() => {
    //   this.subscribtion[this.subscribtion.length - 1].unsubscribe()

    // }
    //   , 100);
    // this.notifyUser(owner!, `${this.user.firstName} commented your post ${post!}`)

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

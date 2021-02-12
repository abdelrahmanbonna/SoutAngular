import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})

export class BookmarkComponent implements OnInit {
  bookmarks: any[] = [];
  bookmarkObj={
    id:'',
    data:{}
  }
  bookmarksRef: any[] = [];
  book:any
  LikesList: any[] = [];
  commentsList: any[] = [];
  postcomfields: string[] = [];
  bookmarkFlag:boolean = false;
  user: any = JSON.parse(localStorage.getItem('userdata')!)
  constructor(config: NgbModalConfig, private modalService: NgbModal,private postsService: PostsService, private firestore: AngularFirestore) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit(): void {
    this.firestore.collection('Users').doc(this.user.id).collection('bookmarks').get().subscribe((res)=>{this.bookmarks=res.docs});
    
    setTimeout(()=>{
      this.bookmarks.forEach((mark)=>{
        mark.data().post.get().then((snapshot:any) => {
          this.bookmarkObj={id:mark.id,data:snapshot.data()};
           this.getLikes(snapshot.data().id); 
           this.getComments(snapshot.data().id);  
           this.bookmarksRef.push(this.bookmarkObj)})
      })},1000)
      setTimeout(()=>{console.log(this.bookmarksRef);this.bookmarkFlag=true;},2000)
  }
  deleteBookmark(bookmarkID:string){
    const ID = this.bookmarksRef.map(function(e) { return e.id; }).indexOf(bookmarkID);
    this.firestore.collection('Users').doc(this.user.id).collection('bookmarks').doc(this.bookmarks[ID].id).delete();
    const element = document.getElementById(bookmarkID);
    element?.parentNode?.removeChild(element);
  }
  open(content:any) {
    console.log(content)
    // document.getElementById(content)?.focus()
    this.modalService.open( content);
  }
  shareBookmark(){
    // return this.firestore.collection("/post", ref => ref.where('postID', '==', id)).get().pipe(map(res => {
    //   docs = res.docs
    //   docs.forEach(el => {
    //     this.dataPost = el.data()
    //     this.allPosts.push(this.dataPost)
    //   })
    //   console.log(this.allPosts)
    //   return this.allPosts;

    // }))
    // this.postsService.addPost()
  }
  //from profile
  addLike(post: any) {
    this.firestore.collection('post').doc(post.id).collection("like").add({
      userid: this.user.id
    })
    this.notifyUser(post.owner.id, `${this.user.firstName} liked on your post `)
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
    await this.firestore.collection('post').doc(postid).collection('comment').valueChanges().subscribe((data) => {
      this.commentsList.push(data);
     // console.log(data)
    })
  }
  async getLikes(postid: string) {
    await this.firestore.collection('post').doc(postid).collection('like').valueChanges().subscribe((data) => {
      this.LikesList.push(data)
      //console.log(data)
    })
  }
  

}

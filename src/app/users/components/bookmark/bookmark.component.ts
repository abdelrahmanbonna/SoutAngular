import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  bookmarks: any[] = [];
  bookmarksRef: any[] = [];
  bookmarkFlag:boolean = false;
  user: any = JSON.parse(localStorage.getItem('userdata')!)
  constructor(private postsService: PostsService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection('Users').doc(this.user.id).collection('bookmarks').valueChanges().subscribe((res) => {
      this.bookmarks = res;
      console.log("res",res)
    })
    setTimeout(()=>{
      this.bookmarks.forEach((mark)=>{
        mark.post.get().then((snapshot:any) => this.bookmarksRef.push(snapshot.data()))
      })},1000)
      setTimeout(()=>{this.bookmarkFlag=true;},1500)
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

}

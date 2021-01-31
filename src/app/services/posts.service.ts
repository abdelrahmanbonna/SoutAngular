import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postsRef: AngularFirestoreCollection<Post>;
  public allPosts: Post[] = []
  public talentsPosts: Array<unknown> = []
  private dbPath = '/post';
  public dataPost: any;
  public dataTalentPost: any;

  constructor(private firestore: AngularFirestore) {
    this.postsRef = firestore.collection(this.dbPath);
  }

  getAllUserPosts(user: User): Observable<any> {
    this.allPosts = [];
    var docs;

    return this.firestore.collection("/post", ref => ref.where('owner', '==', user.id)).get().pipe(map(res => {
      docs = res.docs
      docs.forEach(el => {
        this.dataPost = el.data()
        this.allPosts.push(this.dataPost)
      })
      console.log(this.allPosts)
      return this.allPosts;

    }))
  }

  addPost(post: Post): any {
    console.log(post)
    return this.postsRef.doc(post.id).set({ ...post });
  }

  deletePost(id: string) {
    return this.postsRef.doc(id).delete();
  }

  getPostsOfTalent(talent: string): Observable<any> {
    this.talentsPosts = [];
    var docs;
    
    return this.firestore.collection("/post", ref => ref.where('talent', '==', talent)).get().pipe(map(res => {
      docs = res.docs
      docs.forEach(el => {
        this.dataTalentPost = el.data()
        this.talentsPosts.push(this.dataTalentPost)
      })
      console.log(this.talentsPosts)
      return this.talentsPosts;

    }))
  }
}

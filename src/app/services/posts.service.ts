import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postsRef: AngularFirestoreCollection<Post>;
  public allPosts: Array<unknown> = []
  public talentsPosts: Array<unknown> = []
  private dbPath = '/post';

  constructor(private firestore: AngularFirestore) {
    this.postsRef = firestore.collection(this.dbPath);
  }

  getAllUserPosts(user: User): Array<unknown> {
    this.allPosts=[];
    this.firestore.collection("/post", ref => ref.where('owner', '==', user.id)).get().subscribe(res => {
      if (res) {
        res.docs.forEach(element =>
          this.allPosts.push(element.data())
        );
        // console.log(this.allPosts)
      } else if (!res) {
        throw `Post not found`
      }
    });
    return this.allPosts;
  }

  addPost(post: Post): any {
    console.log(post)
    return this.postsRef.doc(post.id).set({ ...post });
  }

  deletePost(id:string): Promise<void> {
    return this.postsRef.doc(id).delete();
  }

  getPostsOfTalent(talent:string): Array<unknown> {
    this.talentsPosts = [];
    this.firestore.collection("/post", ref => ref.where('talent', '==', talent)).get().subscribe(res => {
      if (res) {
        res.docs.forEach(element =>
          this.talentsPosts.push(element.data())
        );
        // console.log(this.talentsPosts)
      } else if (!res) {
        throw `Post not found`
      }
    });
    return this.talentsPosts;
  }
}

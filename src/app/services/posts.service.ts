import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  allPosts: Post[] = []

  constructor(private firestore: AngularFirestore) { }

  async getAllUserPosts(user: User): Promise<Post[]> {
    await this.firestore
      .collection("post", ref => ref.where('owner', '==', user.id)).valueChanges().subscribe((data: any) => {
        this.allPosts=data
      })
    return this.allPosts
  }

  async addPost(post:Post) {
    await this.firestore
      .collection("post").doc().set(post);
  }

}

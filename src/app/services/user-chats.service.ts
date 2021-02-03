import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeService } from './mode.service';
import { map, filter, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserChatsService {


  constructor(private modeService:ModeService, private firestore: AngularFirestore, private fireAuth: AngularFireAuth,private router: Router,private route: ActivatedRoute) { }

  async getChats(){
    await this.firestore.collection(`chat`).get().subscribe(res => {
      if(res.docs){
        res.docs.find((doc) =>{console.log(doc.data())})
      }
    })
  }
}

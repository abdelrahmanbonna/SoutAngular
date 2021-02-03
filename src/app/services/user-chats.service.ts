import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeService } from './mode.service';
import {Msg} from '../models/msg'
import {IChat} from '../models/ichat'

import { map, filter, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserChatsService {

  chats:any
  chat:IChat[]=[];
  chatMsg:Msg={id:'',sender:'',description:'',date:new Date()};
  constructor(private modeService:ModeService, private firestore: AngularFirestore, private fireAuth: AngularFireAuth,private router: Router,private route: ActivatedRoute) { 
  }

  async getChats(userID:string){     
    await this.firestore.collection(`chat`).get().subscribe((res) => {
      if(res.docs){
        let allChats:any
        let count=0
        for(var i = 0; i < res.docs.length; i++){
          allChats= res.docs[i].data();
          if(allChats.sender == userID || allChats.receiver == userID){
            this.chat[count] = allChats
            this.chat[count++]['id'] = res.docs[i].id//(res.docs[i].id,allChats);
            
         }
        }
        //return this.chat        
      }
     // return null
    })
  }
   getUserChats(userID:string){
     this.getChats(userID).then(()=>{
      let count = 0;
      //this.chats = JSON.parse(localStorage.getItem('chat')!);

        for(let chatInfo of this.chat.values()){
          this.getMessages(chatInfo.id)
        }

        localStorage.setItem('userChats',JSON.stringify(this.chat))
        return this.chat
    })
  }
  async getMessages(userID:string){
    await this.firestore.collection(`chat/${userID}/1`).valueChanges({ idField: 'id' }).subscribe(res=>{
      let count = 0;
      if(res){
        let msgs:any
        msgs = res
        this.chat[count++].messages = msgs
      }
    })
  }
  async getChatMsgs(){
    await this.firestore.collection(`chat`).get().subscribe(res => {
      if(res.docs){
        res.docs.find((doc) =>{console.log(doc.data())})
      }
    })
  }
}

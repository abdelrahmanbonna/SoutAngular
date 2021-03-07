import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModeService } from './mode.service';
import {IChat} from '../models/ichat'

import { map, filter, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserChatsService {

  // chats:any
  chats:IChat[]=[];
  chat:{}[]=[];
  private subscritionList:Subscription[]=[];
  //chatTemp:IChat[]=[];//{id:'',sender:'',receiver:'',startDate:new Date(),messages:[]};
  constructor(private modeService:ModeService, private firestore: AngularFirestore) { 
    this.chat=[]
  }

  getChats(userID:string): Observable<any>{  
    return this.firestore.collection<IChat>('chat', ref => 
    ref.orderBy('startDate','asc'))
  .snapshotChanges()
  .pipe(map(chats => {
    chats.forEach(chat =>{
    if (chat) {
      const data = chat.payload.doc.data();
      const ID = chat.payload.doc.id;
      if(data.receiver === userID ||  data.sender === userID){
        this.chat.push({ID, ...data})
      }
      
    }})
    // console.log("ChatGet",this.chat)
      return [...this.chat];
    }));

  }
   getUserChats(userID:string): Observable<any>{
    // console.log("hgjhl;hlfghjk")
      return this.getChats(userID).pipe(map((chats,index) =>{
         console.log("hhchats",chats, "index",index)
        chats.forEach((chat:any, index:number)=>{
           // console.log("chatElem",chat,"index",index)
            this.subscritionList.push(this.firestore.collection(`chat/${chat.ID}/1`,ref => 
            ref.orderBy('date','asc')).valueChanges().subscribe(
              (msgs:any)=> chats[index].messages = msgs
              ))
         })
         
         //console.log("After",chats)
         return [...chats]
      }))
       //console.log("before",chats)
       
  }
  ngOnDestroy(){
    for(let sub of this.subscritionList){
      sub?.unsubscribe();
    }
  }
}

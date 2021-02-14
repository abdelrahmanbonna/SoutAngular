import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserChatsService } from 'src/app/services/user-chats.service';
import { Subscription } from 'rxjs';
import { FireService } from 'src/app/services/fire.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Msg } from 'src/app/models/msg';
import { IChat } from 'src/app/models/ichat';
import {formatDate } from '@angular/common';
import { timestamp } from 'rxjs/operators';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  classApplied:boolean = true;
  user: User = new User();
  user2: User = new User();
  chats:any
  chatFlag:boolean = false;
  msgsFlag:boolean = false;
  person2Data:[]=[]
  persons:{}[]=[]
  userChats:IChat[]=[]
  start :string='';
  newMsg:string='';
  ordermsgs:string[]=[];
  personName:string='';
  personPic:string='';
  msg:{}={sender:'',description:'',date:new Date(),}
  private subscritionList:Subscription[]=[];

  constructor(private chatService: UserChatsService, private firestore:AngularFirestore) { 
    this.user = JSON.parse(localStorage.getItem('userdata')!)
  }

  ngOnInit(): void {
    this.subscritionList.push(this.chatService.getUserChats(this.user.id).subscribe(chats => {this.chats = chats.filter((v:any,i:any,a:any)=>a.findIndex((t:any)=>(t.ID === v.ID))===i);
      this.chats.forEach((chatInfo:any)=>{
        if(chatInfo.sender !== this.user.id) this.subscritionList.push(this.firestore.collection(`Users`).doc(chatInfo.sender)
        .get().subscribe((res:any)=>{this.persons.push(res.data())}))
        else if(chatInfo.receiver !== this.user.id) this.subscritionList.push(this.firestore.collection(`Users`).doc(chatInfo.receiver)
        .get().subscribe((res:any)=>{this.persons.push(res.data())}))
        // if(chatInfo.messages){
          
        //   this.start=new Date(chatInfo.startDate.toDate()).toLocaleDateString("en-us");
        //   chatInfo.messages.forEach((ms:any)=>{
        //     if( new Date(ms.date.toDate()).toLocaleDateString("en-us") < this.start)
        //   })

        // }
      })//t.id === v.id)
      this.persons=this.persons.filter((v:any,i:any,a:any)=>a.findIndex((t:any)=>(t.id === v.id))===i)
      console.log("persons",this.persons);

      if(this.chats) {
        this.chatFlag=true; 
        if(this.chats[0].messages){
          
         
           console.log(this.chats[0].messages=this.sortData(this.chats[0].messages));
          //console.log(this.chats[0].messages.sort((a:any,b:any)=> new Date(a.date.toDate()).toLocaleDateString("en-us")< new Date(b.date.toDate()).toLocaleDateString("en-us")))
        // console.log("chatssort",this.chats);
          this.msgsFlag=true;}}
    }))
      // setTimeout(()=>{ console.log("this.chats",this.chats)},1000)
  }
  sortData(arr:[]) {
    var dd;
    return arr.sort((a:any, b:any) => {
      return <any>new Date(b.date.toDate()) - <any>new Date(a.date.toDate());
    });
  }
  addMsg(){
    if(this.newMsg){
      let id = this.firestore.createId();
      this.msg={sender:this.user.id,description:this.newMsg,date:new Date()}
      this.firestore.collection('/chat').doc(this.chats[0].ID).collection('1').doc(id).set({ ...this.msg })
    }
    
  }
  ngAfterViewInit() {
    
  }
  ngOnDestroy(){
    for(let sub of this.subscritionList){
      sub?.unsubscribe();
    }
  }
  ngOnChanges(){

  }
  toggleActionMenue(){
    this.classApplied = !this.classApplied;
    // this.myChats()
  }
  

}

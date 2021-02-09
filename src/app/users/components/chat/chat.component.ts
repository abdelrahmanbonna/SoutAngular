import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserChatsService } from 'src/app/services/user-chats.service';
import { Subscription } from 'rxjs';
import { FireService } from 'src/app/services/fire.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Msg } from 'src/app/models/msg';

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
  msgs:Msg[] = [{id:"1",
    sender:"Fatma",
    description:"Hello",
    date:new Date()},{id:"2",
    sender:"Eman",
    description:"Hello Fatma, H R U",
    date:new Date()},
    {id:"3",
    sender:"Fatma",
    description:"The Project Crached in the DEADline day",
    date:new Date()},
    {id:"4",
    sender:"Eman",
    description:"OOOHH, So sad ISA The Supervisor will take care of that",
    date:new Date()},
    {id:"5",
    sender:"Fatma",
    description:"HeISA :((",
    date:new Date()},
    {id:"6",
    sender:"Fatma",
    description:"Good bye, see u",
    date:new Date()},
    {id:"7",
    sender:"Fatma",
    description:"see u",
    date:new Date()}];
  person2Data:[]=[]
  persons:{}[]=[]
  persons2ID:string[]=[]
  private subscritionList:Subscription[]=[];

  constructor(private chatService: UserChatsService, private firestore:AngularFirestore) { 
    this.user = JSON.parse(localStorage.getItem('userdata')!)
  }

  ngOnInit(): void {
     this.getChatsFirst()
     setTimeout(()=>{this.myChats()},4000)
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
   getChatsFirst(){
      this.chatService.getUserChats(this.user.id)
      setTimeout(()=>{this.chats = JSON.parse(localStorage.getItem('userChats')!)},1000)
      setTimeout(()=>{
        if(this.chats) this.chatFlag=true;
      },1000)
      setTimeout(()=>{
        if(this.chats[0].messages) this.msgsFlag=true;
      },1000)
  }
  fakeMsgs(){
    // this.msgs=[{
    //   date: new Date()
    // },{}]
  }
  myChats(){
    
    console.log("this.chats",this.chats)
    let count = 0;
    for(let chatInfo of this.chats){
      this.msgs.push(chatInfo.messages)
      if(chatInfo.sender !== this.user.id) this.persons2ID.push(chatInfo.sender)
      else if(chatInfo.receiver !== this.user.id) this.persons2ID.push(chatInfo.receiver)
    }
    for(let person of this.persons2ID.values())
    {
      this.firestore.collection(`Users`).doc(person).get().subscribe(res=>{
        let userInfo:any
        userInfo = res.data();
        this.persons.push(userInfo)
        
      })
    }  
    // for(let p of this.msgs.values())
    // { 
    //   console.log("p",p)
    // }
      
  }

  toggleActionMenue(){
    this.classApplied = !this.classApplied;
    // this.myChats()
  }
  

}

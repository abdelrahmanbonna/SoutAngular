import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserChatsService } from 'src/app/services/user-chats.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  classApplied:boolean = true;
  user: User = new User();
  private subscritionList:Subscription[]=[];

  constructor(private chatService: UserChatsService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdata')!)
    console.log("here")
    console.log("chats",this.chatService.getChats())
    ;

  }
  ngAfterViewInit() {

  }
  ngOnDestroy(){
    for(let sub of this.subscritionList){
      sub?.unsubscribe();
    }
}
  toggleActionMenue(){
    this.classApplied = !this.classApplied;
  }
  

}

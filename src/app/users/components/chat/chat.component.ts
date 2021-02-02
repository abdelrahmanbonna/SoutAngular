import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FireService } from 'src/app/services/fire.service';
import { ModeService } from 'src/app/services/mode.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  classApplied:boolean = true;
  user: User = new User();

  constructor(private modeService:ModeService,private fireService:FireService, private firestore: AngularFirestore, private fireAuth: AngularFireAuth,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdata')!)
  }
  toggleActionMenue(){
    this.classApplied = !this.classApplied;
  }
  getChats(){
    
  }

}

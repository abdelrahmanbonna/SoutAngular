import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  showProfile : boolean = false;

  constructor(private auth :AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((admin)=>{
      if (admin){
        this.showProfile = true;
      }
      else 
      this.showProfile = false;
    })
  }

}

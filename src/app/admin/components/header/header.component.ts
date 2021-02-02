import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerUserName : string | undefined;
  showProfile : boolean = false;

  constructor(private adminAuth : AdminAuthService,
              private auth : AngularFireAuth) { }
 
 

  ngOnInit(): void {
    this.adminAuth.currentAdminName.subscribe(message => {
      console.log(message);
     this.headerUserName = message;
   })
   this.auth.onAuthStateChanged((admin)=>{
     if (admin){
       this.showProfile = true;
     }
     else 
     this.showProfile = false;
   })
  }

  logout(){
    this.adminAuth.logout();
  }

}

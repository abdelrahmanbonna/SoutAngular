import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  headerUserName : string | undefined;
  showProfile : boolean = false;
  timerVar : any | undefined;

  constructor(private adminAuth : AdminAuthService,
              private auth : AngularFireAuth) { }
  

  ngOnInit(): void {
    this.adminAuth.currentAdminName.subscribe(message => {
      //console.log(message);
     this.headerUserName = message;
    //  if (this.headerUserName != ''){
    //    console.log(`this.headerUserName ${this.headerUserName}`)
    //   this.showProfile = true;
    //  }else{
    //   this.showProfile = false;
    //  }
   })

   //timeout to handle on refresh bug
   this.timerVar = setTimeout(() => {
    this.auth.onAuthStateChanged((admin)=>{
      if (admin){
        this.showProfile = true;
      }
      else 
      this.showProfile = false;
    })
   }, 1000);
   
  }

  logout(){
    this.adminAuth.logout();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timerVar)
  }

}

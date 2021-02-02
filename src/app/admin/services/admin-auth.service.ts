import { Injectable } from '@angular/core';
import { AdminModule } from '../admin.module';
import { FireService } from './fire.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


interface Iaccount  {
  email : string
  password : string
}

@Injectable({
  providedIn: AdminModule
})


export class AdminAuthService {

  private userId : string | undefined;

  private adminName = new BehaviorSubject('prof');
  currentAdminName = this.adminName.asObservable();

  private err = new BehaviorSubject('');
  currenterr = this.err.asObservable();


  constructor(private fire : FireService,
              private auth: AngularFireAuth,
              private router : Router) {

   this.auth.onAuthStateChanged((admin)=>{
      if(admin){
        let temp :string | null = localStorage.getItem('adminName')
        this.adminName.next(temp? temp : '');
      }
      else{
         this.router.navigate(['admin/login'])
     }
   })
 } 

  

  login(account : Iaccount) {
    this.auth.signInWithEmailAndPassword(account.email, account.password)
      .then((resp) => {
        this.userId = resp.user?.uid;
        this.fire.getDocument(`admins/${this.userId}`).subscribe((resp)=>{
          if(resp){
            this.err.next("");
            this.adminName.next(resp.name);
            localStorage.setItem('adminName',resp.name);
            this.router.navigate(['admin/dashboard']);
          }
          else{
            console.log('ia m else')
            this.auth.signOut();
          }
        })
      }).catch((error)=> {
        this.err.next(error);
      })
  }
  

  logout(){
    this.auth.signOut();
  }

  

  
}

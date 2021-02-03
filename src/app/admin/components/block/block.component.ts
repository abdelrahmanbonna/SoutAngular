import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { FireService } from '../../services/fire.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ReportBlockService } from '../../services/report-block.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit ,OnDestroy{

  @ViewChild ('userInfo')  userInfo : ElementRef | undefined;

  userId : string = "";
  blockObject : any = {
    blocked : true
  }
  subs : Subscription | undefined;
  user : User | undefined;
  userProfilePic : any;

  constructor(private fire : FireService,
              private storage : AngularFireStorage,
              private report_block : ReportBlockService,
              private router : Router) { }

  ngOnInit(): void {
    if(this.report_block.getId()){
      this.userId = this.report_block.getId();
    }
  }

  getUserInfo() : void{
    this.subs = this.fire.getDocument(`Users/${this.userId}`).subscribe((resp)=>{
      this.user = resp;
      console.log(this.user);
      //const ref = this.storage.refFromURL(resp.picURL);
      //this.userProfilePic = ref.getDownloadURL();
      this.renderUserInfo();
    })
  }

  blockUser() :void{
    this.fire.updateDocument(`Users/${this.userId}`,this.blockObject);
  }

  renderUserInfo() {
    this.userInfo? this.userInfo.nativeElement.hidden = false
     : console.log("element undefined");
  }

  goToProfile(){
    this.router.navigate(['/users/profile/',this.userId]);
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }


}

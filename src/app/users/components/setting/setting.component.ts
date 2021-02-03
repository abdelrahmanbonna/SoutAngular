import { OnDestroy, SimpleChanges } from '@angular/core';
import { AfterViewInit, OnChanges } from '@angular/core';
import { Component, NgModule, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { ISettingsShow } from 'src/app/users/viewModels/isettings';
import { ISettingsData } from 'src/app/users/viewModels/isettings-data';
import { User } from 'src/app/models/user.model';

import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FireService } from 'src/app/services/fire.service';
import { ModeService } from 'src/app/services/mode.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit,  AfterViewInit, OnChanges, OnDestroy {
  settings: ISettingsShow={accountPrivacy:true,themes:false,changePassword:false,notifications:false,report:false,manageAccount:false};
  settingsData: ISettingsData={privateAcc:false,favColor:'',favMode:'',oldPassword:'',deactive:false};
  openedValue:boolean=false;
  alertDeact:boolean=false;
  newPass:string='';
  oldPass:string='';
  user: User = new User();
  userAuth;
  code:any; 
  constructor(private modeService:ModeService,private fireService:FireService, private firestore: AngularFirestore, private fireAuth: AngularFireAuth,private router: Router,private route: ActivatedRoute) {
    
    this.userAuth= JSON.parse(localStorage.getItem('userauth')!);
   }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdata')!)
    if (this.user) {
      this.settingsData.privateAcc = this.user.privateAcc;
      this.settingsData.favColor = this.user.favColor;
      this.settingsData.favMode = this.user.favMode;
      this.settingsData.deactive = this.user.deactive;
      if(this.settingsData.favMode==="dark") {this.OnDark();this.settingsData.favMode="dark";}
      else if(this.settingsData.favMode==="light") {this.defaultMode();this.settingsData.favMode="light";}
    }
    else
      this.router.navigate(['/landing'])
  }
  OnDark(){
    this.modeService.OnDarkFont(document.querySelectorAll(".nav-item a"),document.querySelectorAll(".darkFont"));
    this.modeService.OnDarkColumn(document.querySelectorAll("#sidebarMenu")); this.settingsData.favMode="dark";
  }
  defaultMode(){
    this.modeService.defaultModeColumn(document.querySelectorAll("#sidebarMenu")); this.settingsData.favMode="light";
    this.modeService.defaultModeFont(document.querySelectorAll(".nav-item a"),document.querySelectorAll(".darkFont"));
    
  }
  ngAfterViewInit(){
    console.log('ngAfterViewInit');
  }
  ngOnChanges(changes: SimpleChanges){
    console.log('changes',changes);
  }
  ngOnDestroy(){
    this.saveThemes();
  }
  disableOthers(settingName:'accountPrivacy'|'themes'|'changePassword'|'notifications'|'report'|'manageAccount'){
    this.openedValue = this.settings[settingName];
    this.disableAll();
    this.settings[settingName]=!this.openedValue;
  }
  disableAll(){
    this.settings.accountPrivacy=false;
    this.settings.themes=false;
    this.settings.changePassword=false;
    this.settings.notifications=false;
    this.settings.report=false;
    this.settings.manageAccount=false;
  }
  active(obj:any){
    obj.style.backgroundColor='#BBBBBA'
  }
  deactivate(){
    this.alertDeact=true;
  }
  confirmDeactivate() {
    window.location.href = "../landing";
  }
  resetPassword(){
    this.fireAuth.sendPasswordResetEmail(this.userAuth.email).then(
      ()=>{
        alert("Check Your Email")
      },
      err=>{
        alert(err)
      }
    );
  }
  saveThemes(){
    this.fireService.updateDocument(`/Users/${this.user.id}`,{favColor:this.settingsData.favColor,favMode:this.settingsData.favMode})
    localStorage.setItem('userdata', JSON.stringify({favColor:this.settingsData.favColor,favMode:this.settingsData.favMode}))
  }
  actionCode:any;
  actionCodeChecked:boolean=false;
  mode:any;
  changePassword(){

    this.fireAuth.signInWithEmailAndPassword(this.userAuth.email, this.settingsData.oldPassword).then(res => {
      console.log("res1",res)
      
      if (res.user) {
        this.resetPassword();
      }
    }).catch(err=>{ alert(err)})
  }
}

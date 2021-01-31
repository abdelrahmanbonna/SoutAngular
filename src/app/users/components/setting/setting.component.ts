import { SimpleChanges } from '@angular/core';
import { AfterViewInit, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ISettings } from 'src/app/users/viewModels/isettings'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit,  AfterViewInit, OnChanges {
  settings: ISettings={accountPrivacy:true,themes:false,changePassword:false,notifications:false,report:false,manageAccount:false};
  openedValue:boolean=false;
  dark:boolean=false;
  alertDeact:boolean=false;
  color:string='';
  constructor() {
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    console.log('ngAfterViewInit');
  }
  ngOnChanges(changes: SimpleChanges){
    console.log('changes',changes);
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

  columnsDark(columns:any) {
    if (this.dark) {
        for (var i = 0; i < columns.length; i++) {
            columns[i].style.backgroundColor = "rgb(32, 30, 30)";
            columns[i].style.boxShadow = "0px 0.5px 5px #ddd";
            columns[i].style.color = "white";
        }
    } else {
        for (var i = 0; i < columns.length; i++) {
            columns[i].style.backgroundColor = "#F0F2F5";
            columns[i].style.boxShadow = "0px 0.5px 5px grey";
             columns[i].style.color = "#444444";
        }
    }
  }
  OnDark() {
    document.body.style.backgroundColor = "rgb(19, 18, 18)";
    var allColumns = document.querySelectorAll("#sidebarMenu");
    var innerSettingsFont = document.querySelectorAll(".nav-item a");
    var darkFontAll = document.querySelectorAll(".darkFont");
    this.dark=true;
    this.columnsDark(allColumns);
    this.insideColumnsFont(innerSettingsFont,darkFontAll)

  }
  defaultMode() {
    document.body.style.backgroundColor = "white";
    var allColumns = document.querySelectorAll("#sidebarMenu");
    var innerSettingsFont = document.querySelectorAll(".nav-item a");
    var darkFontAll = document.querySelectorAll(".darkFont");
    this.dark=false;
    this.columnsDark(allColumns);
    this.insideColumnsFont(innerSettingsFont,darkFontAll)
  }
  insideColumnsFont(navItems:any,darkFonts:any) {
    
    if (this.dark) {
        for (var i = 0; i < navItems.length; i++) {
          navItems[i].style.color = "white";
          // navItems[i].style.backgroundColor = "#444444";
        }
        for (var i = 0; i < darkFonts.length; i++) {
          darkFonts[i].style.color = "white";
        }
    } else {
        for (var i = 0; i < navItems.length; i++) {
          navItems[i].style.color = "#444444";
          // navItems[i].style.backgroundColor = "white";
        }
        for (var i = 0; i < darkFonts.length; i++) {
          darkFonts[i].style.color = "#444444";
        }
    }
  }
  deactivate(){
    this.alertDeact=true;
  }
  confirmDeactivate() {
    window.location.href = "../landing";
  }
}

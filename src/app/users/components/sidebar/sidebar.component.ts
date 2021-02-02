
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModeService } from 'src/app/services/mode.service';
import { UserInfoService } from 'src/app/services/user-info.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: any;
 // bg_c:string='white';
  constructor(private modeService:ModeService, private usrInfo: UserInfoService, private route: Router) {
    this.user = JSON.parse(localStorage.getItem('userdata')!);
    if(this.user.favMode === "dark") this.OnDark()
    else this.defaultMode()
  }
  OnDark(){
    this.modeService.OnDarkFont(document.querySelectorAll(".nav-item a"),document.querySelectorAll(".darkfont"));
    this.modeService.OnDarkColumn(document.querySelectorAll("#sidebarMenu")); 
  }
  defaultMode(){
    this.modeService.defaultModeColumn(document.querySelectorAll("#sidebarMenu")); 
    this.modeService.defaultModeFont(document.querySelectorAll(".nav-item a"),document.querySelectorAll(".darkfont"));
    
  }

  ngOnInit(): void {
  }



}

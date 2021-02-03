import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  constructor() { }
  //READ ME
  //Add them in Your Typescript with selections that u want apply mode on them 
  // OnDark(){
  //   this.modeService.OnDarkFont(document.querySelectorAll(".nav-item a"),document.querySelectorAll(".darkfont"));
  //   this.modeService.OnDarkColumn(document.querySelectorAll("#sidebarMenu")); 
  // }
  // defaultMode(){
  //   this.modeService.defaultModeColumn(document.querySelectorAll("#sidebarMenu")); 
  //   this.modeService.defaultModeFont(document.querySelectorAll(".nav-item a"),document.querySelectorAll(".darkfont"));
    
  // }
  OnDarkColumn(...args: any[]) {
    document.body.style.backgroundColor = "rgb(19, 18, 18)";
    for(var i = 0; i < args.length; i++) {
      this.columns(args[i],"dark");
    }
  }
  OnDarkFont(...args: any[]){
    for(var i = 0; i < args.length; i++) {
      this.fonts(args[i],"dark");
    }
  }
  defaultModeColumn(...args: any[]) {
    document.body.style.backgroundColor = "white";
    for(var i = 0; i < args.length; i++) {
      this.columns(args[i],"light");
    }
  }
  defaultModeFont(...args: any[]){
    for(var i = 0; i < args.length; i++) {
      this.fonts(args[i],"light");
    }
  }
  columns(columns:any, mode:string) {
    if (mode==="dark") {
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

  fonts(Items:any, mode:string) {
    
    if (mode==="dark") {
        for (var i = 0; i < Items.length; i++) {
          Items[i].style.color = "white";
        }
    } else {
        for (var i = 0; i < Items.length; i++) {
          Items[i].style.color = "#444444";
        }
    }
  }
}

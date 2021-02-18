import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  constructor() { }
  //READ ME
  //call Body() first to change the body color according to mode
  //Then for each container or div or anything U wanna make its BG changes with mode: add (dark) class to them
  //Then for each fonts U wanna make them changes with mode: add (font) class to them
  //Then call OnDark() or defaultMode() according to user mode
  
  Body(mode:string){
    if (mode==="dark"){
      document.body.style.backgroundColor = "#212121";
    }
    else{
      document.body.style.backgroundColor = "#F0F2F5";
    }
  }
  OnDark(){
    //  document.body.style.backgroundColor = "#212121";
    this.Body("dark");
    this.columns(document.querySelectorAll(".dark"),'dark');
    this.fonts(document.querySelectorAll(".font"),'dark');
  }
  defaultMode(){
    this.Body("light");
    this.columns(document.querySelectorAll(".dark"),'light');
    this.fonts(document.querySelectorAll(".font"),'light');
  }
  columns(columns:any, mode:string) {
    if (mode==="dark") {
        for (var i = 0; i < columns.length; i++) {
            columns[i].style.backgroundColor = "#2E2E2E";
        }
    } else {
        for (var i = 0; i < columns.length; i++) {
            columns[i].style.backgroundColor = "#F0F2F5";
        }
    }
  }

  fonts(Items:any, mode:string) {
    
    if (mode==="dark") {
        for (var i = 0; i < Items.length; i++) {
          Items[i].style.color = "#F0F2F5";
        }
    } else {
        for (var i = 0; i < Items.length; i++) {
          Items[i].style.color = "#444444";
        }
    }
  }
}

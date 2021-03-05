import { AngularFirestore } from '@angular/fire/firestore';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModeService } from 'src/app/services/mode.service';

import { Subscription } from 'rxjs';
import { FireService } from 'src/app/services/fire.service';

import { UserInfoService } from 'src/app/services/user-info.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public notificationsNo: number = 0
  subs: Subscription[] = []
  user: any;
  talentsList: any[] = []
  subscribtion: Subscription[] = [];
  usertalents: any[] = []
  constructor(private modeService: ModeService, private usrInfo: FireService, private route: Router, private firestore: AngularFirestore) {
    this.user = JSON.parse(localStorage.getItem('userdata')!);
    this.loadTalents()
    this.loadUserTalents()
    if (this.user.favMode === "dark") this.OnDark()
    else this.defaultMode()
  }

  OnDark() {
    this.modeService.OnDarkFont(document.querySelectorAll(".nav-item a"), document.querySelectorAll(".darkfont"));
    this.modeService.OnDarkColumn(document.querySelectorAll("#sidebarMenu"));
  }
  defaultMode() {
    this.modeService.defaultModeColumn(document.querySelectorAll("#sidebarMenu"));
    this.modeService.defaultModeFont(document.querySelectorAll(".nav-item a"), document.querySelectorAll(".darkfont"));

  }

  loadTalents() {
    this.subscribtion.push(this.usrInfo.getCollection('talents').subscribe(data => {
      this.talentsList = data;
    }))
  }

  loadUserTalents() {
    this.subscribtion.push(this.firestore.collection('Users').doc(this.user.id).collection('talents').valueChanges().subscribe(data => {
      this.usertalents = data;
    }))
  }


  ngOnInit(): void {
    this.getnotificationsno()
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.forEach(e => {
      e.unsubscribe();
    })
  }

  getnotificationsno() {
    this.subs.push(this.firestore.collection('Users').doc(this.user.id).collection('notifications').valueChanges().subscribe((data) => {
      console.log(`notifications: ${data}`)
      data.forEach(element => {
        if (element.seen === false || element.seen === undefined) this.notificationsNo++;
      })
    }))
  }

  addtalents(talent: any) {
    this.firestore.collection('Users').doc(this.user.id).collection('talents').doc(talent.id).set(talent)
  }

  async removeTalent(t: any) {
    await this.firestore.collection('Users').doc(this.user.id).collection('talents').doc(t).delete()
  }
}

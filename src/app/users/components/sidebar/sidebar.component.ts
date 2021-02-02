
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FireService } from 'src/app/services/fire.service';
import { UserInfoService } from 'src/app/services/user-info.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  notificationsNo: number = 0
  subs: Subscription[] = []
  user: any;
  constructor(private usrInfo: FireService, private route: Router) {
    this.user = JSON.parse(localStorage.getItem('userdata')!);
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
    this.subs.push(this.usrInfo.getDocument(`Users/${this.user.id}`).subscribe((data) => {
      this.notificationsNo = data.notifications.length
    }))
  }

}

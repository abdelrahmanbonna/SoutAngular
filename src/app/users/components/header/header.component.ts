import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private usrInfo: UserInfoService, private route: Router) { }

  ngOnInit(): void {
    let usr = JSON.parse(localStorage.getItem('userdata')!)
    if (usr.id === "") {
      this.route.navigate(['/landing'])
    }
  }
  logout() {
    console.log(`works`)
    localStorage.removeItem("**");
    localStorage.removeItem('userdata');
    this.usrInfo.signOut();
    this.route.navigate(['/landing'])
  }

}

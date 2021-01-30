import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-talents',
  templateUrl: './talents.component.html',
  styleUrls: ['./talents.component.scss']
})
export class TalentsComponent implements OnInit {
  user: any;
  greating: string;
  constructor(private usrInfo: UserInfoService, private route: Router) {
    this.user = JSON.parse(localStorage.getItem('userdata')!);
    this.greating = "What's up, " + this.user.firstName! + " " + this.user.secondName! + "?";
  }

  ngOnInit(): void {
    if (document.querySelector('.modal-backdrop')) {
      document.querySelector('.modal-backdrop')!.remove();
    }
  }

}

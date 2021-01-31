import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;
  greating: string;
  constructor(private usrInfo: UserInfoService, private route: Router, private el: ElementRef) {
    this.user = JSON.parse(localStorage.getItem('userdata')!);
    this.greating = "What's up, " + this.user.firstName! + " " + this.user.secondName! + "?";

  }

  ngOnInit(): void {
    this.el.nativeElement.querySelector('.modal-backdrop').remove()
  }

}

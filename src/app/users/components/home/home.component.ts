import { Component, OnInit } from '@angular/core';
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
  constructor(private usrInfo: UserInfoService, private route: Router) {
    this.user = JSON.parse(localStorage.getItem('userdata')!);
    console.log(this.user)
    this.greating = "What's up, " + this.user.firstName + " " + this.user.secondName + "?";

  }

  ngOnInit(): void {
    if (!localStorage.getItem('userdata')) {
      this.route.navigate(['/landing'])
    }
    document.querySelector('.modal-backdrop')!.remove();

  }

}

import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-notofication',
  templateUrl: './notofication.component.html',
  styleUrls: ['./notofication.component.scss']
})
export class NotoficationComponent implements OnInit {
  notoficationArr: string[] = [];
  userName: string = "";

  constructor(private FireService: FireService
  ) {

  }

  ngOnInit(): void {
    //   this.FireService.getCollection("Users").subscribe((res) => {
    //     console.log(res);
    //     this.notoficationArr = res.map((user) => {
    //       return user.notifications
    //     })
    //     console.log(this.notoficationArr)

    //   })

    // }

    this.FireService.getDocument("Users/BNWRPQjBX8caFDp2LzBJQJeLgFc2").subscribe((res) => {
      console.log(res)
      this.notoficationArr = res.notifications
      this.userName = res.firstName
      console.log(this.notoficationArr)

    })
  }
}





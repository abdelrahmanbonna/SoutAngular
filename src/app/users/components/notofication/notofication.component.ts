import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-notofication',
  templateUrl: './notofication.component.html',
  styleUrls: ['./notofication.component.scss']
})
export class NotoficationComponent implements OnInit {
  notoficationArr: any[] = [];
  user: any = JSON.parse(localStorage.getItem('userdata')!)

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

    this.FireService.getDocument(`Users/${this.user.id}`).subscribe((res) => {
      console.log(res)
      this.notoficationArr = res.notifications
      console.log(this.notoficationArr)

    })
  }
}





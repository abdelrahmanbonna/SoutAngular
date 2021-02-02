import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-notofication',
  templateUrl: './notofication.component.html',
  styleUrls: ['./notofication.component.scss']
})
export class NotoficationComponent implements OnInit {
  notoficationArr: any[] = [];
  user: any = JSON.parse(localStorage.getItem('userdata')!)

  constructor(private FireService: FireService, private firestore: AngularFirestore
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

    this.firestore.collection('Users').doc(this.user.id).collection('notifications').valueChanges().subscribe((res) => {
      this.notoficationArr = res;
      console.log(res)
    })
  }
}





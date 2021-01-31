import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TalentService } from 'src/app/services/talent.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  public user: User = new User();
  talentList: unknown[] = [];
  
  constructor(private talentService: TalentService, private route: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdata')!)
    if (this.user) {
      // console.log(this.usrInfo.loggedin)
      
      this.getAllTalents();
    }
    else
      this.route.navigate(['/landing'])
  }

  getAllTalents() {
    this.talentList = this.talentService.getAllTalents()
    console.log(this.talentList)

  }

}

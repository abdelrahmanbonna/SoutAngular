import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashBoardService } from '../../services/dash-board.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {

  
  constructor(private dash : DashBoardService) {
   }
 

  ngOnInit(): void {
    this.dash.usersChart('myChart');
    this.dash.postsChart('myChart2');
    //this.dash.talentsChart('myChart3');
  }

  ngOnDestroy(): void {
    this.dash.unsubscribe();
  }

}

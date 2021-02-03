import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DashBoardService } from '../../services/dash-board.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy,AfterViewInit {

  
  constructor(private dash : DashBoardService) {
   }

  ngOnInit(): void {};

  ngAfterViewInit(): void {
    this.dash.usersChart('usersChart');
    this.dash.postsChart('postsChart');
    this.dash.talentsChart('talentsChart');
  }



  ngOnDestroy(): void {
    this.dash.unsubscribe();
  }

}

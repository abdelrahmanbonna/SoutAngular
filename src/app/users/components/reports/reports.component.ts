import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';
import { IREPORT } from '../../ViewModels/ireport';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  report: IREPORT = {
    audio: "",
    date: "HELLO",
    description: "JHKJKJKJJKKKKKJJJJJJJJJJJJJJJ",
    image: "string",
    reportedId: "REPO",
    title: "title one",
    type: "User",
    userId: "100",
  };
  constructor(private FireService: FireService) { }

  ngOnInit(): void {
    // this.FireService.addDocument("Reports", this.report);
  }

}

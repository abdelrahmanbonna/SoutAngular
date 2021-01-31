import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  name: string = "Mai Ahmed";
  messagesNo: number = 10;
  notificationsNo: number = 13;
  @Input() iconColor:string="#ee4c22";
  constructor() { }

  ngOnInit(): void {
  }

}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchServiceService } from 'src/app/services/search-service.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usr = JSON.parse(localStorage.getItem('userdata')!)


  constructor(private usrInfo: UserInfoService, private route: Router, private searchServ: SearchServiceService) {

  }



  // ngAfterViewInit(): void {
  //   this.searchValue.nativeElement.value = this.searchServ.InputVal,
  //     console.log(this.searchValue?.nativeElement.value);



  // }

  ngOnInit(): void {

    if (this.usr.id === "") {
      this.route.navigate(['/landing'])
    }
  }
  logout() {
    console.log(`works`)
    localStorage.removeItem("**");
    localStorage.removeItem('userdata');
    this.usrInfo.signOut();
    this.route.navigate(['/landing'])
  }
  search(str: string) {
    console.log(str)

    this.route.navigate(['/users/search/', (str)])
  }

}

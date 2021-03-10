import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { SearchServiceService } from 'src/app/services/search-service.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  userArr: any[] = [];

  inputValFromService: string | null = "";

  constructor(private fireService: FireService, private serchService: SearchServiceService, private actrout: ActivatedRoute) {

    this.inputValFromService = this.serchService.InputVal;

  }

  ngOnInit(): void {
    this.actrout.paramMap.subscribe((param) => {
      this.inputValFromService = param.get("Sq")

    })
    this.fireService.getCollection("Users").subscribe((res) => {
      console.log(res);
      this.userArr = res.filter((user) => {
        return (user.firstName == this.inputValFromService) || (user.secondName == this.inputValFromService)
      })
      console.log(this.userArr)



    })


  }

}



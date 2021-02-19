import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  lang: string = "en";
  constructor(private locale: LocalizationService) {
    this.lang = this.locale.getLanguage()
  }

  ngOnInit(): void {
  }

  changeLang(lang: string) {
    this.locale.setLanguage(lang);
  }


}

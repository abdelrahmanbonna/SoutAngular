import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  lang: string;
  constructor(private locale: LocalizationService) {
    this.lang = this.locale.getLanguage()
    if (this.lang == '' || this.lang == null) this.lang = 'en';
  }

  ngOnInit(): void {
    this.lang = this.locale.getLanguage();
  }

  changeLang(lang: string) {
    this.locale.setLanguage(lang);
  }


}

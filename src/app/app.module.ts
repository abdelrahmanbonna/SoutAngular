import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from './components/chat/chat.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { SettingComponent } from './components/setting/setting.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LandingComponent } from './components/landing/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    BookmarkComponent,
    SettingComponent,
    NotfoundComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

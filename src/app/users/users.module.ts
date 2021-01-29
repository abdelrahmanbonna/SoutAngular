import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  UsersRoutingModule
} from './users-routing.module';
import {
  UsersComponent
} from './users.component';
import {
  SidebarComponent
} from './components/sidebar/sidebar.component';
import {
  HeaderComponent
} from './components/header/header.component';
import {
  DiscoverComponent
} from './components/discover/discover.component';
import {
  ProfileComponent
} from './components/profile/profile.component';
import {
  OtherProfileComponent
} from './components/other-profile/other-profile.component';
import {
  HomeComponent
} from './components/home/home.component';
import {
  TalentsComponent
} from './components/talents/talents.component';
import {
  SearchComponent
} from './components/search/search.component';
import {
  NotoficationComponent
} from './components/notofication/notofication.component';
import {
  ReportsComponent
} from './components/reports/reports.component';
import {
  SettingComponent
} from './components/setting/setting.component';
import {
  BookmarkComponent
} from './components/bookmark/bookmark.component';
import {
  ChatComponent
} from './components/chat/chat.component';



@NgModule({
  declarations: [
    BookmarkComponent,
    UsersComponent,
    SidebarComponent,
    HeaderComponent,
    SettingComponent,
    ChatComponent,
    HomeComponent,
    TalentsComponent,
    DiscoverComponent,
    ProfileComponent,
    OtherProfileComponent,
    SearchComponent,
    NotoficationComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }

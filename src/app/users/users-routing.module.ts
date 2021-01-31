import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { ChatComponent } from './components/chat/chat.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { HomeComponent } from './components/home/home.component';
//import { ReportsComponent } from './components/reports/reports.component';
import { NotoficationComponent } from './components/notofication/notofication.component';
import { OtherProfileComponent } from './components/other-profile/other-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { SettingComponent } from './components/setting/setting.component';
import { TalentsComponent } from './components/talents/talents.component';


import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  //{ path: 'reports', component: ReportsComponent },
  { path: 'messages', component: ChatComponent },
  { path: 'bookmarks', component: BookmarkComponent },
  { path: 'settings', component: SettingComponent },
  { path: 'talents', component: TalentsComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:UID', component: OtherProfileComponent },
  { path: 'notifications', component: NotoficationComponent },
  { path: 'search/:Sq', component: SearchComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

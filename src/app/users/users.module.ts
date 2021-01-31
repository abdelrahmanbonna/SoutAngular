import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OtherProfileComponent } from './components/other-profile/other-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TalentsComponent } from './components/talents/talents.component';
import { SearchComponent } from './components/search/search.component';
import { NotoficationComponent } from './components/notofication/notofication.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';




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
    UsersRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,

  ]
})
export class UsersModule { }

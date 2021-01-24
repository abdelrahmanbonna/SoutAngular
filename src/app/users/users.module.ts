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

@NgModule({
  declarations: [UsersComponent, SidebarComponent, HeaderComponent, HomeComponent, LoginComponent, RegisterComponent, TalentsComponent, FooterComponent, DiscoverComponent, ProfileComponent, OtherProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }

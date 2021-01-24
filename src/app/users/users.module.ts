import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { NotoficationComponent } from './components/notofication/notofication.component';
import { ReportsComponent } from './components/reports/reports.component';


@NgModule({
  declarations: [UsersComponent, SidebarComponent, HeaderComponent, FooterComponent, SearchComponent, NotoficationComponent, ReportsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }

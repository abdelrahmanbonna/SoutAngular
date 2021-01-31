import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
//import { ReportsComponent } from './components/reports/reports.component';



import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  //{ path: 'reports', component: ReportsComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

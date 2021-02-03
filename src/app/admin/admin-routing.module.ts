import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { BlockComponent } from './components/block/block.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TalentsComponent } from './components/talents/talents.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';

const routes: Routes = [
  { path: '', component: AdminComponent, children:[
    {path: 'login', component: AdminLoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AdminAuthGuard]},
    {path: 'reports', component: ReportsComponent, canActivate: [AdminAuthGuard]},
    {path: 'talents', component: TalentsComponent, canActivate: [AdminAuthGuard]},
    {path: 'block', component: BlockComponent, canActivate: [AdminAuthGuard]},
    {path: '', redirectTo : 'login', pathMatch : 'full'}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

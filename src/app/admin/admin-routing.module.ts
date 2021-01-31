import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { BlockComponent } from './components/block/block.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TalentsComponent } from './components/talents/talents.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children:[
    {path: 'dashboard', component: DashboardComponent},
    {path: 'reports', component: ReportsComponent},
    {path: 'talents', component: TalentsComponent},
    {path: 'block', component: BlockComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

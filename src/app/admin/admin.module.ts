import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TalentsComponent } from './components/talents/talents.component';
import { BlockComponent } from './components/block/block.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';



@NgModule({
  declarations: [AdminComponent, HeaderComponent, FooterComponent, SidebarComponent, DashboardComponent, ReportsComponent, TalentsComponent,  BlockComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireStorageModule
  ]
})
export class AdminModule { }

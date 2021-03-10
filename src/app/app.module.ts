import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LandingComponent } from './components/landing/landing.component';
import { FooterComponent } from './components/footer/footer.component';
import { AngularFireModule } from '@angular/fire';
import { UserInfoService } from './services/user-info.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxLoadingModule } from 'ngx-loading';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    FooterComponent,
    LandingComponent,
    AdminComponent
  ],
  imports: [
    // MDBBootstrapModule.forRoot(),
    UiSwitchModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB34ZDbD7bLBLklSgRbyaEqdOo-ZB1V8dw",
      authDomain: "sout-2d0f6.firebaseapp.com",
      projectId: "sout-2d0f6",
      storageBucket: "sout-2d0f6.appspot.com",
      messagingSenderId: "706376997886",
      appId: "1:706376997886:web:36a3101d876f715a217eaf",
      measurementId: "G-5R8JHQGN68"
    }),
    NgbModule,
    ReactiveFormsModule,
    TooltipModule,
    ModalModule,
    NgxLoadingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    UserInfoService,
    HttpClient
    , BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

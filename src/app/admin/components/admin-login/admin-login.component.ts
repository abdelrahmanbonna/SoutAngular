import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginForm: FormGroup | undefined;
  //loading = false;
  submitted = false;
  error: string | undefined;
  //private id: Guid | undefined;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private adminAuth : AdminAuthService,
              private auth :  AngularFireAuth) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,})')]]
  });
  this.router.navigate(['/admin/dashboard']);
  this.auth.onAuthStateChanged((admin)=>{
    if (admin){
      this.router.navigate(['/admin/dashboard']);
    }
  })
  this.adminAuth.currenterr.subscribe(message => {
    this.error = message;
   
  })

  }

  login(){
    //this.loading = true;
    this.submitted = true;
    this.adminAuth.login(this.loginForm?.value);
  }

  get email() {
    return this.loginForm?.get('email');
  } 

  get password() {
  return this.loginForm?.get('password');
  } 

}

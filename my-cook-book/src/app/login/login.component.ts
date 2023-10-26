import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAuthService } from '../service/userAuth.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit, OnDestroy{

    // Declare subscriptions as class properties
  private subscriptionLoading: Subscription;
  private subscriptionError: Subscription;

  public isLoading = false;
  public errorMessage = "";

  constructor(private router:Router,private userAuthAPI:UserAuthService){}

  ngOnInit(): void {

    this.subscriptionLoading = this.userAuthAPI.isLoading.subscribe((value) => {
      this.isLoading = value;
    });
    
    this.subscriptionError = this.userAuthAPI.errorMessageLogin.subscribe((value) => {
      this.errorMessage = value;
    });
  }

  onSubmit(form:NgForm){
    this.userAuthAPI.login(form.value);
    
  }

  ngOnDestroy() {
    if (this.subscriptionLoading) {
      this.subscriptionLoading.unsubscribe();
    }
    if (this.subscriptionError) {
      this.subscriptionError.unsubscribe();
    }
  }
}

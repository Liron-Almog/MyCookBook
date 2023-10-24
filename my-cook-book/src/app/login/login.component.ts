import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDataService } from '../service/user-data.service';
import { loginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit{

    // Declare subscriptions as class properties
  private subscriptionLoading: Subscription;
  private subscriptionError: Subscription;

  public isLoading = false;
  public errorMessage = [];

  constructor(private router:Router,private loginApi:loginService){}

  ngOnInit(): void {

    this.subscriptionLoading = this.loginApi.isLoading.subscribe((value) => {
      this.isLoading = value;
    });
    
    this.subscriptionError = this.loginApi.errorMessage.subscribe((value) => {
      this.errorMessage = value;
    });
  }

  onSubmit(form:NgForm){

    this.loginApi.login(form.value);
    
  }
}

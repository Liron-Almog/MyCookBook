import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../service/userAuth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../login/login.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{

  constructor(private userAuthAPI:UserAuthService){}

  private subscriptionLoading :Subscription;
  private subscriptionErrorRegister: Subscription;

  public isLoading:boolean = false;
  public errorMessage:string = "";

  ngOnInit(): void {

    this.subscriptionLoading = this.userAuthAPI.isLoading.subscribe((value) => {
      this.isLoading = value;
    });
    
    this.subscriptionErrorRegister = this.userAuthAPI.errorMessageRegister.subscribe((value) => {
      this.errorMessage = value;
    });
  }

  onSubmit(form:NgForm){

    this.userAuthAPI.register(form.value);
  }

  ngOnDestroy() {
    
    if (this.subscriptionLoading) {
      this.subscriptionLoading.unsubscribe();
    }
    if (this.subscriptionErrorRegister) {
      this.subscriptionErrorRegister.unsubscribe();
    }
  }

}

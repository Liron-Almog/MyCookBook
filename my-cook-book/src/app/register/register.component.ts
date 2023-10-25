import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../service/UserAuth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../login/login.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{


  constructor(private userAuthAPI:UserAuthService){}

  private subscriptionLoading :Subscription;
  private subscriptionErrorRegister: Subscription;

  public isLoading = false;
  public errorMessage = "";

  
  ngOnInit(): void {

    this.subscriptionLoading = this.userAuthAPI.isLoading.subscribe((value) => {
      this.isLoading = value;
    });
    
    this.subscriptionErrorRegister = this.userAuthAPI.errorMessageRegister.subscribe((value) => {
      this.errorMessage = value;
    });
  }

  onSubmit(form:NgForm){
    console.log(form.value);
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

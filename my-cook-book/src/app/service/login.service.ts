
import {Injectable, OnDestroy} from '@angular/core'
import { Observable, Subject, Subscription } from 'rxjs';
import { ApiService } from "./api.service";
import { Router } from '@angular/router';

@Injectable({providedIn:"root"})
export class loginService implements OnDestroy{

    constructor(private apiService: ApiService, private router: Router){}

    public errorMessage = new Subject<[]>();
    public isLoading = new Subject<boolean>();

    subscriptionLogin: Subscription; // Make sure to define this subscription

    login(pathAndParams: string) {
        
    this.isLoading.next(true);
    this.subscriptionLogin = this.apiService.post('/login',pathAndParams).subscribe(
      () => {
        this.isLoading.next(false);   
        this.router.navigate(['/my-list']);   
      },
      (error) => {
        // Error case
        this.isLoading.next(false);
        this.errorMessage.next(error.error);
      }
    );
  }



  ngOnDestroy() {
    if (this.subscriptionLogin) {
      this.subscriptionLogin.unsubscribe();
        }
    }
}
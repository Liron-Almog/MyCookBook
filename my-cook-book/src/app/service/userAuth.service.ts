
import {Injectable, OnDestroy} from '@angular/core'
import { Subject, Subscription } from 'rxjs';
import { ApiService } from "./api.service";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({providedIn:"root"})
export class UserAuthService implements OnDestroy{

    constructor(private apiService: ApiService, private router: Router,private cookieService:CookieService){}

    public isLogin = false;
    public errorMessageLogin = new Subject<string>();
    public errorMessageRegister = new Subject<string>();
    public isLoading = new Subject<boolean>();

    subscriptionIsLogin: Subscription
    subscriptionRegister: Subscription;
    subscriptionLogin: Subscription; // Make sure to define this subscription

    logout(){
      this.cookieService.delete('token');
      this.isLogin = false;
    }
  
    login(pathAndParams: string): void {
      
      this.isLoading.next(true);
      this.subscriptionLogin = this.apiService.post('/login', pathAndParams).subscribe(
        (data) => {
          // Successful login
          this.isLoading.next(false);   
          this.cookieService.set('token',data['token']);
          this.isLogin = true;
          this.router.navigate(['/my-list']);
        },
        (error) => {
          // Error case
          this.isLoading.next(false);
          this.errorMessageLogin.next(error.error);
        }
      );
    }

    isUserLoggedIn() : boolean{
      return this.isLogin;
    }

    register(pathAndParams: string){

      this.subscriptionRegister = this.apiService.post('/register', pathAndParams).subscribe(
        (data) => {
          // Successful register
          this.isLoading.next(false);
          this.router.navigate(['/login']);
        },
        (error) => {
          
          // Error case
          this.isLoading.next(false);
          this.errorMessageRegister.next(error.error);
        }
      );
    }
    

    ngOnDestroy() {
      // Check if there is an active subscription for login, and if so, unsubscribe from it.
      if (this.subscriptionLogin) {
        this.subscriptionLogin.unsubscribe();
      }
      if (this.subscriptionIsLogin) {
        this.subscriptionIsLogin.unsubscribe();
      }

      
    
      // Check if there is an active subscription for registration, and if so, unsubscribe from it.
      if (this.subscriptionRegister) {
        this.subscriptionRegister.unsubscribe();
      }
    }
    
}
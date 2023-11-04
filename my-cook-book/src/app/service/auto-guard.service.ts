import { Injectable } from '@angular/core'
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router'
import { Observable } from 'rxjs'
import { UserAuthService } from './userAuth.service'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
  })
export class AutoGuard implements CanActivate{

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return true
        if(this.userAuthService.isUserLoggedIn() && this.cookieService.check('token'))
            return true;
        else this.router.navigate(['/login']);
        return false;
    }
    constructor(private userAuthService: UserAuthService,private router: Router,private cookieService:CookieService){}
}
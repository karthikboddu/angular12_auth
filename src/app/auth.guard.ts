import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from './services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService:AuthenticateService, public router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token =this.authService.isUserLoggedIn ;
       this.authService.verifyUserToken(token).subscribe((res:any)=>{
         console.log(res.status,"#######")
        if (!res.status) { this.authService.logout(); this.authService.clearSessionOutToken(); this.router.navigate(['register']); }
         return !!res.status;
      })

      return true;

  }
  
}

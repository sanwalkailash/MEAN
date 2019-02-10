import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UtilService } from '../services/util.service';
import { AuthService }      from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private util: UtilService,private authService: AuthService) {
      }
    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.info('AuthGuard#canActivate called');
      let url: string = state.url;
      return this.checkLogin(url);
    }

   checkLogin(url: string): boolean {
      if (this.authService.isLoggedIn) { return true; }

      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;

      // Navigate to the login page with extras
      this.util.getRouter().navigate(['/login']);
      return false;
    }
}

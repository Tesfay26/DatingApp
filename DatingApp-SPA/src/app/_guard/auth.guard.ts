import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { AuthService } from '../_service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router, private alertify: AlertifyService) {

  }
  canActivate(): boolean | UrlTree {
    if(this.authService.loggedIn()){
      return true;
    }

    this.alertify.warning("You can't pass!");
    this.router.navigate(['/home']);
    return false;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model:any ={};
  constructor(public authService: AuthService, private alertifyService : AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(next =>{
      this.alertifyService.success("Successfully LoggedIn");
    },
    error=>{
      this.alertifyService.error(error);
    },
    ()=>{
      this.router.navigate(['/members']);
    });
  }

  loggedin(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertifyService.message("logged out.");
    this.router.navigate(['home']);
  }

}

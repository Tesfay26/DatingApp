import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model:any ={};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(next =>{
      console.log("Successfully LoggedIn");
    },
    error=>{
      console.log("Login Faild.");
    });
  }

  loggedin(){
    const user = localStorage.getItem('token');
    return !!user;
  }

  logout(){
    localStorage.removeItem('token');
    console.log("logged out.");
  }

}

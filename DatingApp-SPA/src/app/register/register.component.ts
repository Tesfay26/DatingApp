import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() valueFormHome:any;
  @Output() cancelRegister = new EventEmitter();
  @Output() dataOut = new EventEmitter();
model:any ={};
  constructor(private authService : AuthService) { }

  ngOnInit() {
  }
  register(){
    this.authService.register(this.model).subscribe(next =>{
      console.log("Registration successful.");
    },
    error=>{console.log(error);})
  }
  
  cancled(){
    this.cancelRegister.emit(false);
    this.dataOut.emit(this.model);
    console.log("cancled");
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_service/alertify.service';
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
  constructor(private authService : AuthService, private alertifyService : AlertifyService) { }

  ngOnInit() {
  }
  register(){
    this.authService.register(this.model).subscribe(next =>{
      this.alertifyService.success("Registration successful.");
    },
    error=>{this.alertifyService.error(error);})
  }

  cancled(){
    this.cancelRegister.emit(false);
    this.dataOut.emit(this.model);
  }

}

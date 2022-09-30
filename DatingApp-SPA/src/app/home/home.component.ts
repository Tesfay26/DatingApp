import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
registrationMode:boolean = false;
Value:any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  registrationToggle(){
    this.registrationMode = true;
  }

  getValues(){
    this.http.get("https://localhost:7081/WeatherForecast/value").subscribe(response =>{
      this.Value = response;
    },
    error=>{
      console.log(error);
    });
  }

  cancelRegisterMode(registrationMode:boolean){
    this.registrationMode = registrationMode;
  }
  data(valuess:any){
    console.log("data ",valuess);
  }
}

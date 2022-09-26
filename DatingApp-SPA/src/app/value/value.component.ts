import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.scss']
})
export class ValueComponent implements OnInit {
Value:any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getValues();
  }

  getValues(){
    this.http.get("https://localhost:7081/WeatherForecast/value").subscribe(response =>{
      this.Value = response;
    },
    error=>{
      console.log(error);
    });
  }

}

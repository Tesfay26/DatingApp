import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

// const httpOptions = {
//   headers : new HttpHeaders({
//     'Authorization' : 'Bearer' +localStorage.getItem('token')
//   })
// };

@Injectable()

export class UserService {

baseUrl = environment.apiUrl+'Users';
constructor(private http: HttpClient) { }

getUser(id:number):Observable<User>{
  return this.http.get<User>(this.baseUrl+"/"+ id);
}

getUsers():Observable<User[]>{
  return this.http.get<User[]>(this.baseUrl);
}

updateUser(id:number, userData:User){
  return this.http.put(this.baseUrl+"/"+id, userData);
}

}

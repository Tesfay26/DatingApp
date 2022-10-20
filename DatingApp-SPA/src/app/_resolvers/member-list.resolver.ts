import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/user";
import { AlertifyService } from "../_service/alertify.service";
import { UserService } from "../_service/user.service";

@Injectable()

export class MemberListlResolver implements Resolve<User[]>{
  constructor(private userService: UserService, private router: Router, private alertiryService:AlertifyService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]>  {
     return this.userService.getUsers().pipe(
      catchError(_error => {
        this.alertiryService.error('Problem retrieving data');
        this.router.navigate(['/members']);
        return throwError("");
      })
     );
  }
}

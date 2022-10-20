import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
 export class ErrorInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req)
      .pipe(
        catchError(errors => {
          if(errors instanceof HttpErrorResponse){
            if(errors.status === 401){
              return throwError(errors.statusText);
            }
            const applicationError = errors.headers.get("Application-Error");
            if(applicationError){
              console.log(applicationError);
              return throwError(applicationError);
            }

            const serverError = errors.error;
            let modelStateErrors = '';
            if(serverError && typeof serverError === 'object'){
              for(const key in serverError){
                if(serverError[key]){
                  modelStateErrors +=serverError[key] + '\n';
                }
              }
            }
            throwError(modelStateErrors || serverError || "Server Error");
          }
           return throwError("");
        })
      );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}

import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {AuthService} from "./auth.service";



@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private service: AuthService,
              private http: HttpClient) {}


  async errorHandler (error: HttpErrorResponse)  {
      console.log("Error status 403");
      await this.service.refresh();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    console.log("intercept");

    if (req.headers.get('Authorization') != null) {
      console.log('Not null');
      return next.handle(req);
    }

    let accessToken = localStorage.getItem('access_token');

    let jwttoken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next.handle(jwttoken)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log("Access token interceptor error !");
          if (error.status == 403) {
            this.errorHandler(error);
            jwttoken = req.clone({
              setHeaders: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            console.log('Bearer ' + accessToken);
            return next.handle(jwttoken);
          }
          return next.handle(jwttoken);
        }
      ));
  }


}

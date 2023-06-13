import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private service: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let accessToken = localStorage.getItem('access-token');
    if (accessToken == null || this.service.isTokenExpired(accessToken)) {
      console.log("token expired");
      throwError(()=>"token expired");
    }

    let jwttoken = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    return next.handle(jwttoken);
  }
}

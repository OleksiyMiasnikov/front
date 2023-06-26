import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "./auth.service";
import {ErrorService} from "./error.service";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService,
              private http: HttpClient,
              private errorService: ErrorService) {}


  setAuthHeader(request: HttpRequest<any>, token: any) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  handleRefreshToken (request: HttpRequest<any>, next: HttpHandler)  {
    console.log("Error status 403");
    return  this.authService.refresh()
      .pipe(
        switchMap((response: any) => {
          this.authService.setTokens(response);
          return next.handle(this.setAuthHeader(request, localStorage.getItem('access_token')))
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    console.log("intercept");

    if (req.url == environment.appUrl+'/signup' || req.url == environment.appUrl+'/refresh') {
      return next.handle(req);
    }

    let accessToken = localStorage.getItem('access_token');

    let authenticatedRequest = this.setAuthHeader(req, accessToken);
    return next.handle(authenticatedRequest)
      .pipe(
        catchError(error => {
          console.log("Access token interceptor error!");
          if (error.status == 403) {
            //console.log(JSON.parse(JSON.stringify(error.error)).errorCode);
            return this.handleRefreshToken(req, next);
          }
          return throwError(error);
        }
      ));
  }

  errorHandler(error: HttpErrorResponse){
    let obj = JSON.parse(JSON.stringify(error.error));
    const errorMessage = 'Error: ' + obj.message + '. Code: ' + obj.errorCode;
    console.log(errorMessage)
    this.errorService.handle(errorMessage);
    if (obj.errorCode == 40111) {
      this.authService.logout(errorMessage)
    }
    return throwError(()=>errorMessage);
  }

}

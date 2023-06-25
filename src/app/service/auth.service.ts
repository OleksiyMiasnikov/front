import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import { User } from '../model/user';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {catchError, throwError} from "rxjs";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,
              private errorService: ErrorService) {}

  login(user: User) {
    return this.http
      .post(
        `${environment.appUrl}/login`,
        { name: user.username, password: user.password },
        { observe: 'response' }
      )
      .pipe(
        tap(this.setTokens),
        catchError(this.errorHandler.bind(this))
      );
  }

  setTokens(response: any) {
    console.log('Setting tokens.');
    if (response) {
      const accessToken = response.headers.get('access_token');
      const refreshToken = response.headers.get('refresh_token');
      const name = JSON.parse(window.atob(accessToken.split('.')[1])).name;
      const authorities = JSON.parse(
        window.atob(accessToken.split('.')[1])
      ).authorities;
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('authorities', authorities);
      localStorage.setItem('user', name);
    } else {
      console.log('Clearing local storage.');
      localStorage.clear();
    }
  }

  get token() {
    console.log("get token");
    const accessToken = localStorage.getItem('access_token')!;
    if (this.isTokenExpired(accessToken)) {
      console.log('Access token has been expired!');
      return null;
    }
    console.log('Getting access token.');
    return localStorage.getItem('access_token');
  }

  logout() {
    console.log('Logout!');
    this.setTokens(null);
  }

  isTokenExpired(token: string): boolean {
    console.log('Determining token expiration.');
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  checkExpiration(token: any): string {
    console.log('Checking token expiration.');
    return this.isTokenExpired(token)
      ? this.refresh(): token;
  }


  async refresh() {
    console.log("refresh 1")
    let refreshToken = localStorage.getItem('refresh_token');

    const headers= new HttpHeaders()
      .set('Authorization', 'Bearer ' + refreshToken);

    console.log("refresh 2")
    await this.http
      .get(
        `${environment.appUrl}/refresh`,
        { 'headers': headers ,
          observe: 'response'}
      )
      .pipe(
        tap(this.setTokens),
        catchError(this.errorHandler.bind(this))
      ).subscribe();
    console.log("refresh 4");
  }

  isAuthenticated() {
    return !!this.token;
  }

  errorHandler(error: HttpErrorResponse){
    let obj = JSON.parse(JSON.stringify(error.error));
    const errorMessage = 'Error: ' + obj.message + '. Code: ' + obj.errorCode;
    this.errorService.handle(errorMessage);
    return throwError(()=>errorMessage)
  }
}

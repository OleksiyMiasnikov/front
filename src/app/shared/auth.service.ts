import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../user';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
  
export class AuthService {

  constructor(private http: HttpClient) {} 
  
  login(user: User) {
    console.log('auth.login. User: ' + user.username); 
    
    return this.http.post(`${environment.appUrl}/login`,
      { name: user.username, password: user.password },
      { observe: 'response' })
      .pipe(tap(this.setTokens)); 
  }

  private setTokens(response: any) {
    console.log('Setting tokens.');
    if (response) {
      const accessToken = response.headers.get('access_token');
      const refreshToken = response.headers.get('refresh_token');
      const name = JSON.parse(window.atob(accessToken.split('.')[1])).name;
      const authorities = JSON.parse(window.atob(accessToken.split('.')[1])).authorities;
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('authorities', authorities);
      localStorage.setItem('user', name);
    } else {
      console.log('Clearing local storage.');
      localStorage.clear();
    }    
  }

  get token() {
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

  private isTokenExpired(token: String): boolean {
    console.log('Determining token expiration.');
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  isAuthenticated() {
    return !!this.token;
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private http: HttpClient,
              private errorService: ErrorService) {}

  create(uri: string, data: any): Observable<any> {
    console.log("Creating certificate!");
    return this.http.post<any>(`${environment.appUrl}${uri}`, data)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  update(uri: string, data: any): Observable<any> {
    console.log("Updating certificate!");
    return this.http.patch<any>(`${environment.appUrl}${uri}`, data)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  errorHandler(error: HttpErrorResponse){
    let obj = JSON.parse(JSON.stringify(error.error));
    const errorMessage = 'Error: ' + obj.message + '. Code: ' + obj.errorCode;
    this.errorService.handle(errorMessage);
    return throwError(()=>errorMessage)
  }
}

import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http: HttpClient,
              private errorService: ErrorService) { }

  delete(uri: string): Observable<any> {
    console.log("Creating certificate!");
    return this.http.delete<any>(`${environment.appUrl}${uri}`)
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

import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {catchError, Observable, throwError} from 'rxjs';
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root',
})
export class GetAllService {
  constructor(private http: HttpClient,
              private errorService: ErrorService) {}

  getAll(uri: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${environment.appUrl}${uri}`,
      {
        params: new HttpParams().set('page', page).set('size', size)
      })
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

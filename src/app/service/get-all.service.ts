import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {catchError, Observable, throwError} from 'rxjs';
import {ErrorService} from "./error.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class GetAllService {
  constructor(private http: HttpClient,
              private errorService: ErrorService,
              private authService: AuthService) {}

  getAll(uri: string,
        page: number,
        size: number,
        sortMap: Map<string, string>): Observable<any> {

    let paramsString = 'page=' + page + '&size=' + size;
    sortMap.forEach((k,v) => {
      if (k != '') {
        paramsString = paramsString + '&sort=' + v + ',' + k;
      }
    })

    return this.http.get<any>(`${environment.appUrl}${uri}?${paramsString}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  getByPatternAndListOfTags(uri: string,
                            tags: string[],
                            page: number,
                            size: number,
                            sortMap: Map<string, string>): Observable<any> {

    let paramsString = 'page=' + page + '&size=' + size;
    tags.forEach((t) => {
      paramsString = paramsString + '&tags=' + t;
    })

    sortMap.forEach((k,v) => {
      if (k != '') {
        paramsString = paramsString + '&sort=' + v + ',' + k;
      }
    })

    return this.http.get<any>(`${environment.appUrl}${uri}&${paramsString}`)
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

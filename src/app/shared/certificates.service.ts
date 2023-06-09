import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CertificatesService {
  data: any;

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${environment.appUrl}/certificates`, {
      params: new HttpParams().set('page', page).set('size', size),
    });
  }
}

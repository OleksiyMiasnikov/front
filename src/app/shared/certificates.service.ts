import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Certificate } from '../certificate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CertificatesService {
  data: any;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<Certificate[]>(`${environment.appUrl}/certificates`);
  }
}

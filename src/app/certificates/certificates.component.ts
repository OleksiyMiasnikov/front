import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Certificate } from '../certificate';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  certificates: Certificate[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Init');
    this.http
      .get<Certificate[]>(`${environment.appUrl}/certificates`)
      .subscribe((data: any) => (this.certificates = data['content']));
  }
}

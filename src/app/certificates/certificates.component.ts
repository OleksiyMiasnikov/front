import { Component, OnInit } from '@angular/core';
import { Certificate } from '../certificate';
import { CertificatesService } from '../shared/certificates.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  certificates: Certificate[] = [];
  link = '/certificates';
  currentPage = 1;
  totalPages = 25;
  size = 10;

  constructor(private service: CertificatesService) {}

  ngOnInit(): void {
    this.service.getAll(this.currentPage, this.size).subscribe((data: any) => {
      this.certificates = data['content'];
      this.totalPages = data.totalPages;
    });
  }

  onPageChange(page: number): void {
    console.log(`Page changed to ${page} of ${this.totalPages}.`);
    this.currentPage = page;
  }
}

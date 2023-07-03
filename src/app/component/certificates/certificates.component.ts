import { Component, OnInit } from '@angular/core';
import { Certificate } from '../../model/certificate';
import { GetAllService } from '../../service/get-all.service';

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

  constructor(private service: GetAllService) {}

  ngOnInit(): void {
    this.service.getAll(this.link, this.currentPage, this.size, 0, 0, 0, 0, 0).subscribe((data: any) => {
      this.certificates = data['content'];
      this.totalPages = data.totalPages;
    });
  }

  changePage(newPage: number): void {
    console.log("changePage loaded");
    this.currentPage = newPage;
    this.ngOnInit();
    console.log("current page :" + this.currentPage);
  }
}

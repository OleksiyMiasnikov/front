import {Component, OnInit} from '@angular/core';
import {GetAllService} from "../../service/get-all.service";
import {CertificateWithTags} from "../../model/certificate-with-tags";

@Component({
  selector: 'app-certificates-with-tags',
  templateUrl: './certificates-with-tags.component.html',
  styleUrls: ['./certificates-with-tags.component.scss']
})
export class CertificatesWithTagsComponent implements OnInit{
  certificates: CertificateWithTags[] = [];
  link = '/certificates_with_tags';
  currentPage = 0;
  changedPage = 0;
  totalPages = 25;
  size = 10;

  constructor(private service: GetAllService) {}
  ngOnInit(): void {
    this.service.getAll(this.link, this.currentPage, this.size).subscribe((data: any) => {
      this.certificates = data['content'];
      this.totalPages = data.totalPages;
    });
  }

  onPageChange(page: number): void {
    console.log(`Page changed to ${page} of ${this.totalPages}.`);
    this.currentPage = page;
  }
}

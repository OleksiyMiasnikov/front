import {Component, OnInit} from '@angular/core';
import {GetAllService} from "../../service/get-all.service";
import {CertificateWithTags} from "../../model/certificate-with-tags";
import {DeleteService} from "../../service/delete.service";

@Component({
  selector: 'app-certificates-with-tags',
  templateUrl: './certificates-with-tags.component.html',
  styleUrls: ['./certificates-with-tags.component.scss']
})
export class CertificatesWithTagsComponent implements OnInit {

  certificates: CertificateWithTags[] = [];
  currentCertificate!: CertificateWithTags;
  link: string = '/certificates_with_tags';
  //total: number = 0;
  isPressed: boolean = false;
  loading: boolean = false;
  disabled: boolean = false;
  pageTitle: string = '';
  currentPage:number = 1;
  totalPages:number = 10;
  size:number = 10;
  pages:number[]=[];
  paginatorSize: number = 1;

  constructor(private service: GetAllService,
              private deleteService: DeleteService) {}

  changePage(newPage: number){
    console.log("changePage loaded");
    this.currentPage = newPage;
    this.ngOnInit();
    console.log("current page :" + this.currentPage);
  }

  addNewCertificate() {
    console.log("Button pressed + " + this.isPressed);
    this.pageTitle = 'Add new certificate';
    this.currentCertificate = new CertificateWithTags();
    this.disabled = false;
    this.isPressed = !this.isPressed;
  }

  viewCertificate(certificate: CertificateWithTags) {
    console.log("Viewing certificate with id: " + certificate.id);
    this.pageTitle = 'Certificate details';
    this.currentCertificate = certificate;
    this.disabled = true;
    this.isPressed = !this.isPressed;
  }

  editCertificate(certificate: CertificateWithTags) {
    console.log("Editing certificate with id: " + certificate.id);
    this.pageTitle = 'Edit certificate';
    this.disabled = false;
    this.currentCertificate = certificate;
    this.isPressed = !this.isPressed;
  }

  deleteCertificate(certificate: CertificateWithTags) {
    console.log("deleting certificate with id: " + certificate.id);
    this.deleteService.delete(this.link + '/' + certificate.id)
      .subscribe();
    window.location.reload();
  }

  ngOnInit(): void {
    console.log("CWT.ngOnInit. Current page :" + this.currentPage);
    this.loading = true;
    this.service.getAll(
      this.link,
      this.currentPage - 1,
      this.size
    )
      .subscribe(
        (data: any) => {
          this.certificates = data['content'];
          //this.total = data.totalElements;
          this.totalPages = data.totalPages;
          this.loading = false;
          if (this.totalPages < 9) {
            this.paginatorSize = this.totalPages;
          } else {
            this.paginatorSize = 9;
          }
          this.pagesChange();
        });
  }

  pagesChange() {
    console.log(`Paginator pagesChange. Current:` + this.currentPage + ', paginator size: ' + this.paginatorSize);
    if (this.currentPage < 5 ) {
      this.pages = this.setPages(this.paginatorSize, 1);
    } else if (this.currentPage > this.totalPages - 5) {
      this.pages = this.setPages(this.paginatorSize, this.totalPages - 8);
    } else {
      this.pages = this.setPages(this.paginatorSize, this.currentPage - 4)
    }
  }

  setPages(length: number, start: number) {
    const result: number[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = start + i;
    }
    return result;
  }
}

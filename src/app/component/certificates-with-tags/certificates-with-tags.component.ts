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
  pages:number[]=[1,2,3,4,5,6,7,8,9];

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
        });
    this.pagesChange();
  }

  pagesChange() {
    console.log(`Paginator pagesChange. Current:` + this.currentPage);
    if (this.currentPage < 5 ) {
      this.pages = [1,2,3,4,5,6,7,8,9];
    } else if (this.currentPage > this.totalPages - 5) {
      this.pages = [
        this.totalPages - 8,
        this.totalPages - 7,
        this.totalPages - 6,
        this.totalPages - 5,
        this.totalPages - 4,
        this.totalPages - 3,
        this.totalPages - 2,
        this.totalPages - 1,
        this.totalPages];
    } else {
      this.pages = [
        this.currentPage - 4,
        this.currentPage - 3,
        this.currentPage - 2,
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        this.currentPage + 2,
        this.currentPage + 3,
        this.currentPage + 4];
    }
  }
}

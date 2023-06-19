import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  totalPages:number = 1;
  size:number = 5;
  pages:number[]=[];


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
  }

}

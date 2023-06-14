import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {GetAllService} from "../../service/get-all.service";
import {CertificateWithTags} from "../../model/certificate-with-tags";
import {MatPaginator} from "@angular/material/paginator";
import {tap} from "rxjs/operators";
import {DeleteService} from "../../service/delete.service";

@Component({
  selector: 'app-certificates-with-tags',
  templateUrl: './certificates-with-tags.component.html',
  styleUrls: ['./certificates-with-tags.component.scss']
})
export class CertificatesWithTagsComponent implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator)
  paginator: MatPaginator = <MatPaginator>{};
  certificates: CertificateWithTags[] = [];
  currentCertificate!: CertificateWithTags;
  link: string = '/certificates_with_tags';
  total: number = 0;
  isPressed: boolean = false;
  loading: boolean = false;
  disabled: boolean = false;
  pageTitle: string = '';

  constructor(private service: GetAllService,
              private deleteService: DeleteService) {}


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
    this.deleteService.delete('/certificates_with_tags/' + certificate.id)
      .subscribe();
    window.location.reload();
  }

  ngOnInit(): void {
    this.loading = true;
    this.service.getAll(
      this.link,
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 10
    )
      .subscribe(
        (data: any) => {
          this.certificates = data['content'];
          this.total = data.totalElements;
          this.loading = false;
        });
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.ngOnInit())
      )
      .subscribe()
  }
}

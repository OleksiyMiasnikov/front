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
  totalPages:number = 1;
  size:number = 10;


  constructor(private service: GetAllService,
              private deleteService: DeleteService) {}

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
          this.totalPages = data.totalPages;
          this.loading = false;
        });
  }

  changePage(newPage: number){
    console.log("Page changed to " + newPage);
    this.currentPage = newPage;
    this.ngOnInit();
  }

  changeSize(newSize: number){
    console.log("Size changed to " + newSize);
    this.size = newSize;
    this.currentPage = 1;
    this.ngOnInit();
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

  search(pattern: string){
    console.log("Searching by " + pattern);
    let tags: string[] = [];
    if (pattern.indexOf('#(') > -1) {
      tags = this.tagsExtractor(pattern);
      pattern = pattern.substring(0, pattern.indexOf('#(')) ;
    }
    console.log(`Pattern: ${pattern}. Tags: ${tags}`);

    if (pattern) {
      this.link = '/certificates_with_tags/search?pattern=' + pattern;
    } else {
      this.link = '/certificates_with_tags';
    }
    this.ngOnInit();
  }

  tagsExtractor(str: string): string[] {
    let tags: string[] = [];
    let i: number = 0;
    let start: number = str.indexOf('#(');
    let finish: number = -1;
    while (start > -1 && str.length > 2) {
      finish = this.findFinish(str, start);
      if (finish < 0) {
        break;
      }
      if (start != finish - 2) {
        tags[i] = str.substring(start + 2, finish);
        i++;
      }
      str = str.substring(finish + 1);
      start = str.indexOf('#(');
    }

    return tags;
  }

  findFinish(str: string, start: number): number{
    let finish: number = str.indexOf(')');
    while (finish > -1 && finish < start && str.length > 1) {
      str = str.substring(finish + 1);
      finish = str.indexOf(')');
    }
    return finish;
  }

  isAdmin(): boolean {
    return 'ADMIN' === localStorage.getItem('authorities')
  }

}

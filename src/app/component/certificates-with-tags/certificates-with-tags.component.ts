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
  tags: string[] = [];
  isPressed: boolean = false;
  loading: boolean = false;
  disabled: boolean = false;
  pageTitle: string = '';
  currentPage:number = 1;
  totalPages:number = 1;
  size:number = 10;
  datetimeSort: number = 1;
  titleSort: number = 0;
  descriptionSort: number = 0;
  tagsSort: number = 0;
  priceSort: number = 0;


  constructor(private service: GetAllService,
              private deleteService: DeleteService) {}

  ngOnInit(): void {
    console.log("CWT.ngOnInit. Current page :" + this.currentPage);
    this.loading = true;
    if (this.link == '/certificates_with_tags') {
      this.service.getAll(
        this.link,
        this.currentPage - 1,
        this.size,
        this.datetimeSort,
        this.titleSort,
        this.tagsSort,
        this.descriptionSort,
        this.priceSort
      )
        .subscribe(
          (data: any) => {
            this.certificates = data['content'];
            this.totalPages = data.totalPages;
            this.loading = false;
          });
    } else {
      this.service.getByPatternAndListOfTags(
        this.link,
        this.tags,
        this.currentPage - 1,
        this.size,
        this.datetimeSort,
        this.titleSort,
        this.tagsSort,
        this.descriptionSort,
        this.priceSort
      )
        .subscribe(
          (data: any) => {
            this.certificates = data['content'];
            this.totalPages = data.totalPages;
            this.loading = false;
          });
    }
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
    this.pageTitle = 'Edit certificate with ID=' + certificate.id;
    this.disabled = false;
    this.currentCertificate = certificate;
    this.isPressed = !this.isPressed;
  }

  deleteCertificate(certificate: CertificateWithTags) {
    if(confirm("Are you sure to delete certificate: " + certificate.name)) {
      console.log("deleting certificate with id: " + certificate.id);
      this.deleteService.delete(this.link + '/' + certificate.id)
        .subscribe();
      window.location.reload();
    }

  }

  search(pattern: string){
    console.log("Searching by " + pattern);
    if (pattern.indexOf('#(') > -1) {
      this.tags = this.tagsExtractor(pattern);
      pattern = pattern.substring(0, pattern.indexOf('#(')).trim() ;
    } else {
      this.tags = [];
    }
    console.log(`Pattern: ${pattern}. Tags: ${this.tags}`);
    this.currentPage = 1;
    if (pattern || this.tags.length > 0) {
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

  changeDatetimeSort() {
    if (this.datetimeSort == 0) {
      this.datetimeSort = -1;
    } else if (this.datetimeSort == 1) {
      this.datetimeSort = 0;
    } else {
      this.datetimeSort = 1;
    }
  }

  changeTitleSort() {
    if (this.titleSort == 0) {
      this.titleSort = -1;
    } else if (this.titleSort == 1) {
      this.titleSort = 0;
    } else {
      this.titleSort = 1;
    }
  }

  changeTagsSort() {
    if (this.tagsSort == 0) {
      this.tagsSort = -1;
    } else if (this.tagsSort == 1) {
      this.tagsSort = 0;
    } else {
      this.tagsSort = 1;
    }
  }

  changeDescriptionSort() {
    if (this.descriptionSort == 0) {
      this.descriptionSort = -1;
    } else if (this.descriptionSort == 1) {
      this.descriptionSort = 0;
    } else {
      this.descriptionSort = 1;
    }
  }

  changePriceSort() {
    if (this.priceSort == 0) {
      this.priceSort = -1;
    } else if (this.priceSort == 1) {
      this.priceSort = 0;
    } else {
      this.priceSort = 1;
    }
  }

}

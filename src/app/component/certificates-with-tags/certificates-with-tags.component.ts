import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GetAllService} from "../../service/get-all.service";
import {CertificateWithTags} from "../../model/certificate-with-tags";
import {MatPaginator} from "@angular/material/paginator";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-certificates-with-tags',
  templateUrl: './certificates-with-tags.component.html',
  styleUrls: ['./certificates-with-tags.component.scss']
})
export class CertificatesWithTagsComponent implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator)
  paginator: MatPaginator = <MatPaginator>{};
  certificates: CertificateWithTags[] = [];
  link = '/certificates_with_tags';
  total: number = 0;
  isPressed: boolean = false;

  constructor(private service: GetAllService) {}


  isButtonPressed() {
    console.log("Button pressed + " + this.isPressed);
    this.isPressed = !this.isPressed;
  }
  ngOnInit(): void {
    this.service.getAll(
      this.link,
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 10
    )
      .subscribe(
        (data: any) => {
          this.certificates = data['content'];
          this.total = data.totalElements;
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

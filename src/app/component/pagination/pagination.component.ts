import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage!: number;
  @Input() totalPages: number = 0;
  @Input() link: string = '';
  @Output() changedPage= new EventEmitter<number>();
  pages:number[]=[];

  constructor() {}

  ngOnInit(): void {
    console.log(`Pagination init. Current page :  ${this.currentPage}.`);
    this.pagesChange();
  }

  onPageChange(page: number): void {
    console.log(`Paginator onPageChange`);
    this.changedPage.emit(page);
  }

  pagesChange() {
    let paginatorSize;
    if (this.totalPages < 9) {
      paginatorSize = this.totalPages;
    } else {
      paginatorSize = 9;
    }
    console.log(`Paginator pagesChange. Current:` + this.currentPage +
      ' of ' +
      this.totalPages +
      ', paginator size: ' + paginatorSize);

    if (this.currentPage < 5 ) {
      this.pages = this.setPages(paginatorSize, 1);
    } else if (this.currentPage > this.totalPages - 5) {
      this.pages = this.setPages(paginatorSize, this.totalPages - 8);
    } else {
      this.pages = this.setPages(paginatorSize, this.currentPage - 4)
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

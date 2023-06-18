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
  @Input() pages:number[]=[1,2,3,4,5,6,7,8,9];

  constructor() {}

  ngOnInit(): void {
    console.log(`Pagination init. Current page :  ${this.currentPage}.`);
  }

  onPageChange(page: number): void {
    console.log(`Paginator onPageChange`);
    //this.pagesChange();
    this.changedPage.emit(page);
  }

}

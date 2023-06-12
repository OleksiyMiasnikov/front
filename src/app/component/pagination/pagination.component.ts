import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() link: string = '';
  @Output() changedPage= new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    console.log(`Pagination init. Current page :  ${this.currentPage}.`);
  }

  onPageChange(page: number): void {
    console.log(`______Page changed to ${page} of ${this.totalPages}.`);
    this.changedPage.emit(page);
  }
}

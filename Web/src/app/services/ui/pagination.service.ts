import { Inject, Injectable, Optional } from '@angular/core';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';
import { PurchaseService } from '../purchase.service';
import { EntryService } from '../entry.service';
import { StockService } from '../stock.service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  ITEMS_PER_PAGE!: number;
  totalItems!: number;
  pages: Array<number> = [];
  currentPage!: number;
  totalPages!: number;

  constructor() {
    // @Inject('totalItems') total: number // @Inject('itemsPerPage') itemsPerPage: number,
    // this.ITEMS_PER_PAGE = itemsPerPage;
    // this.totalItems = total;
    // this.setTotalPages(itemsPerPage, total);
    // this.buildPages();
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getTotalPages() {
    return this.totalPages;
  }

  getPages() {
    return this.pages;
  }

  setItemsPerPage(itemsPerPage: number) {
    this.ITEMS_PER_PAGE = itemsPerPage;
  }

  setTotalItems(total: number) {
    this.totalItems = total;
  }

  build(itemsPerPage: number, total: number): any {
    console.log(itemsPerPage, total);
    this.setItemsPerPage(itemsPerPage);
    this.setTotalItems(total);
    this.buildTotalPages();
    this.buildPages();
    this.currentPage = 1;
    return this.pages;
  }

  buildTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.ITEMS_PER_PAGE);
  }

  buildPages() {
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  goPrevious(): any {
    if (this.currentPage != 1) {
      return this.goPage(this.currentPage - 1);
    }
    return this.currentPage;
  }

  goNext(): any {
    if (this.currentPage != this.totalPages) {
      return this.goPage(this.currentPage + 1);
    }
    return this.currentPage;
  }

  goPage(page: number): number {
    this.currentPage = page;
    return this.currentPage;
  }
}

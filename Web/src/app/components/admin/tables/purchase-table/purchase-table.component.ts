import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { Purchase } from 'src/common/models/purchase';
import { PurchaseService } from 'src/app/services/purchase.service';
import { PaginationService } from 'src/app/services/ui/pagination.service';

@Component({
  selector: 'app-purchase-table',
  templateUrl: './purchase-table.component.html',
  styleUrls: ['./purchase-table.component.css'],
})
export class PurchaseTableComponent {
  purchases: Array<Purchase> = [];
  faTrashCan = faTrashCan;

  isDeleteDialogOpen: boolean = false;
  purchaseToDelete!: Object;

  ITEMS_PER_PAGE = 5;
  pages!: Array<number>;
  totalPurchases!: number;
  currentPage!: number;

  constructor(
    private purchServ: PurchaseService,
    private pagination: PaginationService
  ) {}

  ngOnInit(): void {
    this.purchServ.getTotal().subscribe((data: any) => {
      this.totalPurchases = data.total;
      this.pages = this.pagination.build(
        this.ITEMS_PER_PAGE,
        this.totalPurchases
      );
    });
    this.fetchPurchases(1, this.ITEMS_PER_PAGE);
    this.currentPage = this.pagination.getCurrentPage();
  }

  //DATA FETCH

  fetchPurchases(page: number, limit: number) {
    let correctPage = page;
    this.purchServ
      .getAllWithPagination(correctPage, limit)
      .subscribe((data: any) => {
        this.purchases = data;
        this.currentPage = page;
      });
  }

  reloadPurchases() {
    this.fetchPurchases(this.currentPage, this.ITEMS_PER_PAGE);
  }

  //PAGINATION

  goNext() {
    this.currentPage = this.pagination.goNext();
    this.fetchPurchases(this.currentPage, this.ITEMS_PER_PAGE);
  }

  goPrevious() {
    this.currentPage = this.pagination.goPrevious();
    this.fetchPurchases(this.currentPage, this.ITEMS_PER_PAGE);
  }

  goPage(page: number) {
    this.currentPage = this.pagination.goPage(page);
    this.fetchPurchases(this.currentPage, this.ITEMS_PER_PAGE);
  }

  //ACTIONS

  deletePurchase(purchase: Purchase) {
    this.purchaseToDelete = purchase;
    this.isDeleteDialogOpen = !this.isDeleteDialogOpen;
  }
}

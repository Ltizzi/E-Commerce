import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { Stock } from 'src/common/models/stock';
import { StockService } from 'src/app/services/stock.service';
import { PaginationService } from 'src/app/services/ui/pagination.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css'],
})
export class StockTableComponent {
  stocks: Array<Stock> = [];
  faPen = faPen;
  faTrashCan = faTrashCan;

  isEditDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  stockToEdit!: Object;
  stockToDelete!: Object;

  ITEMS_PER_PAGE = 5;
  pages!: Array<number>;
  totalStocks!: number;
  currentPage!: number;

  constructor(
    private stockServ: StockService,
    private pagination: PaginationService
  ) {}

  ngOnInit(): void {
    this.stockServ.getTotal().subscribe((data: any) => {
      this.totalStocks = data.total;
      this.pages = this.pagination.build(this.ITEMS_PER_PAGE, this.totalStocks);
    });
    this.fetchStocks(1, this.ITEMS_PER_PAGE);
    this.currentPage = this.pagination.getCurrentPage();
  }

  //DATA FETCH

  fetchStocks(page: number, limit: number) {
    let correctPage = page - 1;
    this.stockServ
      .getAllWithPagination(correctPage, limit)
      .subscribe((data: any) => {
        this.stocks = data;
        this.currentPage = page;
      });
  }

  reloadStocks() {
    this.fetchStocks(this.currentPage, this.ITEMS_PER_PAGE);
  }

  //PAGINATION
  goNext() {
    this.currentPage = this.pagination.goNext();
    this.fetchStocks(this.currentPage, this.ITEMS_PER_PAGE);
  }

  goPrevious() {
    this.currentPage = this.pagination.goPrevious();
    this.fetchStocks(this.currentPage, this.ITEMS_PER_PAGE);
  }

  goPage(page: number) {
    this.currentPage = this.pagination.goPage(page);
    this.fetchStocks(this.currentPage, this.ITEMS_PER_PAGE);
  }

  //ACTIONS + MODALS

  goToStock(id: number | undefined, event: Event) {}

  deleteStock(stock: Stock) {
    this.stockToDelete = stock;
    this.isDeleteDialogOpen = !this.isDeleteDialogOpen;
  }

  showEditModal(stock: Stock) {
    this.isEditDialogOpen = !this.isEditDialogOpen;
    this.stockToEdit = stock;
  }

  closeDeleteDialog() {
    this.isDeleteDialogOpen = !this.isDeleteDialogOpen;
    this.reloadStocks();
  }

  closeEditDialog() {
    this.isEditDialogOpen = !this.isEditDialogOpen;
    this.reloadStocks();
  }
}
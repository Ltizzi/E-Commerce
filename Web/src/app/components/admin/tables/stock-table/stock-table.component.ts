import { faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { Stock } from 'src/common/models/stock';
import { StockService } from 'src/app/services/stock.service';
import { PaginationService } from 'src/app/services/ui/pagination.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css'],
})
export class StockTableComponent {
  stocks: Array<Stock> = [];
  faPen = faPen;
  faTrashCan = faTrashCan;
  faPlus = faPlus;

  isEditorDialogOpen: boolean = false;
  stockToEdit!: Stock;
  newOrEdit!: boolean;

  isDeleteDialogOpen: boolean = false;
  stockToDelete!: Object;

  ITEMS_PER_PAGE = 5;
  pages!: Array<number>;
  totalStocks!: number;
  currentPage!: number;

  constructor(
    private stockServ: StockService,
    private pagination: PaginationService,
    private eventServ: EventService
  ) {}

  ngOnInit(): void {
    this.stockServ.getTotal().subscribe((data: any) => {
      this.totalStocks = data.total;
      this.pages = this.pagination.build(this.ITEMS_PER_PAGE, this.totalStocks);
    });
    this.eventServ.subscribe('updateStock').subscribe((data) => {
      this.reloadStocks();
    });
    this.fetchStocks(1, this.ITEMS_PER_PAGE);
    this.currentPage = this.pagination.getCurrentPage();
  }

  //DATA FETCH

  fetchStocks(page: number, limit: number) {
    let correctPage = page;
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

  // deleteStock(stock: Stock) {
  //   this.stockToDelete = stock;
  //   this.isDeleteDialogOpen = !this.isDeleteDialogOpen;
  // }

  // showEditModal(stock: Stock) {
  //   this.isEditDialogOpen = !this.isEditDialogOpen;
  //   this.stockToEdit = stock;
  // }

  // closeDeleteDialog() {
  //   this.isDeleteDialogOpen = !this.isDeleteDialogOpen;
  //   this.reloadStocks();
  // }

  // closeEditDialog() {
  //   this.isEditDialogOpen = !this.isEditDialogOpen;
  //   this.reloadStocks();
  // }

  showNewEntryModal(stock: Stock, newOrEdit: boolean) {
    this.isEditorDialogOpen = !this.isEditorDialogOpen;
    this.stockToEdit = stock;
    this.newOrEdit = newOrEdit;
  }

  closeEntryEditor() {
    this.isEditorDialogOpen = !this.isEditorDialogOpen;
    this.reloadStocks();
  }
}

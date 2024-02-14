import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/common/models/product';
import { Router } from '@angular/router';
import { PaginationService } from 'src/app/services/ui/pagination.service';
import { EventService } from 'src/app/services/event.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { State } from 'src/common/models/state';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
  animations: [
    trigger('tableState', [
      state(
        'firstLoad',
        style({
          opacity: 0,
          transform: 'scale(0.9)',
        })
      ),
      state(
        'normal',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      transition('firstLoad<=>normal', animate(150)),
    ]),
  ],
})
export class ProductTableComponent {
  products: Array<Product> = [];
  faPen = faPen;
  faTrashCan = faTrashCan;

  isEditModalDisplayed: boolean = false;
  showDeleteDialog: boolean = false;
  productToEdit!: Object;
  productToDelete!: Object;

  ITEMS_PER_PAGE = 5;
  pages!: Array<number>;
  totalProducts!: number;
  currentPage!: number;

  state: State = {
    animation: {
      table: 'firstLoad',
    },
  };

  constructor(
    private prodServ: ProductService,
    private router: Router,
    private pagination: PaginationService,
    private eventServ: EventService
  ) {}

  ngOnInit(): void {
    this.hideTable();
    this.prodServ.getTotal().subscribe((data: any) => {
      this.totalProducts = data.total;
      this.pages = this.pagination.build(
        this.ITEMS_PER_PAGE,
        this.totalProducts
      );
    });
    this.eventServ.subscribe('updateProducts').subscribe((data) => {
      this.reloadProducts();
    });

    this.fetchProducts(1, this.ITEMS_PER_PAGE);
    this.currentPage = this.pagination.getCurrentPage();
    this.showTable();
  }

  //DATA FETCH

  fetchProducts(page: number, limit: number) {
    let correctPage = page;
    this.prodServ
      .getAllWithPagination(correctPage, limit)
      .subscribe((data: any) => {
        this.products = data;
        this.currentPage = page;
        this.state.animation.table = 'normal';
      });
  }

  reloadProducts() {
    this.fetchProducts(this.currentPage, this.ITEMS_PER_PAGE);
  }

  //PAGINATION

  hideTable() {
    setTimeout(() => {
      this.state.animation.table = 'firstLoad';
    }, 50);
  }

  showTable() {
    setTimeout(() => {
      this.state.animation.table = 'normal';
    }, 200);
  }

  goNext() {
    this.hideTable();
    console.log('asda');
    this.currentPage = this.pagination.goNext();
    this.fetchProducts(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  goPrevious() {
    this.hideTable();
    console.log('asda');
    this.currentPage = this.pagination.goPrevious();
    this.fetchProducts(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  goPage(page: number) {
    this.hideTable();
    this.currentPage = this.pagination.goPage(page);
    this.fetchProducts(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  //ACTIONS + MODALS

  goToProduct(id: number | undefined, event: Event) {
    event.preventDefault();
    this.router.navigate(['/product'], { queryParams: { id: id } });
  }

  deleteProduct(product: Product) {
    this.productToDelete = product;
    this.showDeleteDialog = !this.showDeleteDialog;
  }

  showEditModal(product: Product) {
    console.log(this.isEditModalDisplayed);
    this.isEditModalDisplayed = !this.isEditModalDisplayed;
    console.log(product);
    this.productToEdit = product;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = !this.showDeleteDialog;
    this.prodServ.getAll().subscribe((data: any) => (this.products = data));
  }

  closeModal() {
    this.isEditModalDisplayed = !this.isEditModalDisplayed;
    this.prodServ.getAll().subscribe((data: any) => (this.products = data));
  }
}

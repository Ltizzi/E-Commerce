import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/common/models/product';
import { Router } from '@angular/router';
import { PaginationService } from 'src/app/services/ui/pagination.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
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

  constructor(
    private prodServ: ProductService,
    private router: Router,
    private pagination: PaginationService
  ) {}

  ngOnInit(): void {
    this.prodServ.getTotal().subscribe((data: any) => {
      this.totalProducts = data.total;
      this.pages = this.pagination.build(
        this.ITEMS_PER_PAGE,
        this.totalProducts
      );
    });

    this.fetchProducts(1, this.ITEMS_PER_PAGE);
    this.currentPage = this.pagination.getCurrentPage();
  }

  //DATA FETCH

  fetchProducts(page: number, limit: number) {
    let correctPage = page;
    this.prodServ
      .getAllWithPagination(correctPage, limit)
      .subscribe((data: any) => {
        this.products = data;
        this.currentPage = page;
      });
  }

  reloadProducts() {
    this.fetchProducts(this.currentPage, this.ITEMS_PER_PAGE);
  }

  //PAGINATION

  goNext() {
    console.log('asda');
    this.currentPage = this.pagination.goNext();
    this.fetchProducts(this.currentPage, this.ITEMS_PER_PAGE);
  }

  goPrevious() {
    console.log('asda');
    this.currentPage = this.pagination.goPrevious();
    this.fetchProducts(this.currentPage, this.ITEMS_PER_PAGE);
  }

  goPage(page: number) {
    this.currentPage = this.pagination.goPage(page);
    this.fetchProducts(this.currentPage, this.ITEMS_PER_PAGE);
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

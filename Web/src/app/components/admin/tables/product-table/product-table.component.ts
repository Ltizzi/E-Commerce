import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/common/models/product';
import { Router } from '@angular/router';

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

  constructor(private prodServ: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.prodServ.getAll().subscribe((data: any) => (this.products = data));
  }

  goToProduct(id: number | undefined, event: Event) {
    event.preventDefault();
    this.router.navigate(['/product'], { queryParams: { id: id } });
  }

  showEditModal(product: Product) {
    console.log(this.isEditModalDisplayed);
    this.isEditModalDisplayed = !this.isEditModalDisplayed;
    console.log(product);
    this.productToEdit = product;
  }

  deleteProduct(product: Product) {
    this.productToDelete = product;
    this.showDeleteDialog = !this.showDeleteDialog;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = !this.showDeleteDialog;
    this.prodServ.getAll().subscribe((data: any) => (this.products = data));
  }

  closeModal() {
    this.isEditModalDisplayed = !this.isEditModalDisplayed;
    this.prodServ.getAll().subscribe((data: any) => (this.products = data));
  }

  reloadProducts() {
    this.prodServ.getAll().subscribe((data: any) => (this.products = data));
  }
}

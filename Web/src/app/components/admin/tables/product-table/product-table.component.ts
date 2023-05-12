import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/common/models/product';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent {
  products: Array<Product> = [];

  constructor(private prodServ: ProductService) {}

  ngOnInit(): void {
    this.prodServ.getAll().subscribe((data: any) => (this.products = data));
  }
}

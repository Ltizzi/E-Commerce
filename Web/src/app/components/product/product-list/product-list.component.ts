import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/common/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Array<Product> = [];

  isLoaded: Boolean = false;

  constructor(private prodServ: ProductService, private router: Router) {}

  ngOnInit(): void {
    // if (localStorage.getItem('products')) {
    //   this.products = JSON.parse(localStorage.getItem('products') as string);
    //   this.isLoaded = true;
    // } else {
    this.getAll();
    localStorage.setItem('products', JSON.stringify(this.products));
    this.isLoaded = true;
    //}
  }

  getAll() {
    this.prodServ.getAll().subscribe((data: any) => {
      this.products = data;
    });
  }
}

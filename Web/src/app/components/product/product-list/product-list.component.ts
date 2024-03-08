import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/ui/search.service';
import { Product } from 'src/common/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Array<Product> = [];
  searchedProducts: Array<Product> = [];
  showAll = true;

  isLoaded: Boolean = false;

  constructor(
    private prodServ: ProductService,
    private eventServ: EventService,
    private searchServ: SearchService
  ) {}

  ngOnInit(): void {
    // if (localStorage.getItem('products')) {
    //   this.products = JSON.parse(localStorage.getItem('products') as string);
    //   this.isLoaded = true;
    // } else {
    //this.getAll();
    if (!sessionStorage.getItem('products')) {
      this.prodServ.getAll().subscribe((data: any) => {
        sessionStorage.setItem('products', JSON.stringify(data));
        this.products = data;
        console.log(this.products);
        this.isLoaded = true;
        this.showAll = true;
      });
    } else {
      this.products = JSON.parse(sessionStorage.getItem('products') as string);
      this.isLoaded = true;
      this.showAll = true;
    }

    this.eventServ.subscribe('updateSearch').subscribe((data) => {
      this.showAll = false;
      this.searchedProducts = this.searchServ.search(data);
    });

    //}
  }

  getAll() {
    this.prodServ.getAll().subscribe((data: any) => {
      this.products = data;
      return data;
    });
  }

  onFilteredProducts(array: Array<Product>) {
    this.showAll = false;
    this.searchedProducts = array;
  }

  onClearTypeFilter() {
    this.showAll = true;
    this.searchedProducts = [];
  }
}

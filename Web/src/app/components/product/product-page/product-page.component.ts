import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/common/models/product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  product!: Product;
  id!: number;
  isLoaded: Boolean = false;

  constructor(
    private prodServ: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];
    });
    console.log(this.id);
    if (!localStorage.getItem('product')) {
      let prod = JSON.parse(localStorage.getItem('product') as string);
      if (prod.id == this.id) {
        this.product = prod;
        this.isLoaded = true;
      }
    } else {
      this.getById(this.id);
      localStorage.setItem('product', JSON.stringify(this.product));
      this.isLoaded = true;
    }
  }

  getById(id: number) {
    this.prodServ.getById(id).subscribe((data: any) => {
      this.product = data;
    });
  }
}

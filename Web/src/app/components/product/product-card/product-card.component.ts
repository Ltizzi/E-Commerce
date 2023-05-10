import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/common/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('data')
  product!: Product;

  constructor(private router: Router) {}

  goToProduct(id: number, event: Event) {
    event.preventDefault();
    this.router.navigate(['/product'], { queryParams: { id: id } });
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/common/models/cart';
import { Product } from 'src/common/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  private _product!: Product;
  isLoaded = false;

  @Input('data')
  set product(value: Product) {
    this._product = value;
    this.isLoaded = !!value;
    console.log(this._product);
  }

  get product(): Product {
    return this._product;
  }

  constructor(private router: Router) {}

  goToProduct(id: number | undefined, event: Event) {
    event.preventDefault();
    this.router.navigate(['/product'], { queryParams: { id: id } });
  }

  addProductToCart(product: Product) {
    const cart: Cart = {
      product: product,
      cantidad: 1,
      user_id: 1, //TODO
    };
    if (localStorage.getItem('carts')) {
      const carts: Array<Cart> = JSON.parse(
        localStorage.getItem('carts') as string
      );
      carts.push(cart);
      this.addCartsToLocalStorage(carts);
    } else {
      const carts: Array<Cart> = [];
      carts.push(cart);
      this.addCartsToLocalStorage(carts);
    }
  }

  addCartsToLocalStorage(carts: Array<Cart>) {
    localStorage.removeItem('carts');
    localStorage.setItem('carts', JSON.stringify(carts));
  }
}

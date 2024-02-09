import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { StockService } from 'src/app/services/stock.service';
import { Cart } from 'src/common/models/cart';
import { Product } from 'src/common/models/product';
import { User } from 'src/common/models/user';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  private _product!: Product;
  isLoaded = false;
  user!: User;
  stock = false;

  @Input('data')
  set product(value: Product) {
    this._product = value;
    this.isLoaded = !!value;
    console.log(this._product);
  }

  get product(): Product {
    return this._product;
  }

  constructor(
    private router: Router,
    private stockServ: StockService,
    private eventServ: EventService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user') as string);
    }
    this.stockServ
      .checkStock(this._product.product_id as number)
      .subscribe((data: any) => {
        if (data.stock) this.stock = true;
      });
  }

  goToProduct(id: number | undefined, event: Event) {
    event.preventDefault();
    this.router.navigate(['/product'], { queryParams: { id: id } });
  }

  addProductToCart(product: Product) {
    const cart: Cart = {
      product: product,
      cantidad: 1,
      user_id: this.user.user_id as number, //TODO
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
    this.eventServ.emit('updateCartCounter', true);
  }

  addCartsToLocalStorage(carts: Array<Cart>) {
    localStorage.removeItem('carts');
    localStorage.setItem('carts', JSON.stringify(carts));
  }
}

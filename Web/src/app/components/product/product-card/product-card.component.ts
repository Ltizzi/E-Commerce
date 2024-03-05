import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DealService } from 'src/app/services/deal.service';
import { EventService } from 'src/app/services/event.service';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/user.service';
import {
  fadeIndAndFadeOutAnimation,
  hoverInAndOutAnimation,
} from 'src/common/animations';
import { Cart } from 'src/common/models/cart';
import { DealCheckerResponse } from 'src/common/models/dealCheckerResponse';
import { Product } from 'src/common/models/product';
import { State } from 'src/common/models/state';
import { User } from 'src/common/models/user';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  animations: [fadeIndAndFadeOutAnimation, hoverInAndOutAnimation],
})
export class ProductCardComponent {
  @Input('fromProfile') fromProfile!: boolean;
  private _product!: Product;
  isLoaded = false;
  isFav!: boolean;
  dealCheckerResponse!: DealCheckerResponse;
  user!: User;
  stock = false;

  state: State = {
    animation: {
      card: 'out',
      fav: 'leave',
    },
  };

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
    private eventServ: EventService,
    private userServ: UserService,
    private dealServ: DealService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user') as string);
    }
    this.dealServ
      .checkProductHasDeal(this._product.product_id as number)
      .subscribe((data: any) => {
        this.dealCheckerResponse = data;
        this.isLoaded = true;
      });
    this.stockServ
      .checkStock(this._product.product_id as number)
      .subscribe((data: any) => {
        if (data.stock) this.stock = true;
      });
    setTimeout(() => {
      this.state.animation.card = 'in';
    }, 200);
    this.checkIsFav(this._product.product_id as number);
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

  checkIsFav(id: number) {
    return this.userServ.favChecker(id).subscribe((data: any) => {
      this.isFav = data.isFav;
      //      console.log('is ' + this.product.name + ' fav?: ', this.isFav);
    });
  }

  handleFav() {
    this.isFav = !this.isFav;
    const id = this.product.product_id;
    if (id)
      this.userServ.favHandler(id).subscribe((data: any) => {
        if (data.action == 'added') this.isFav = true;
        else this.isFav = false;
        this.eventServ.emit('updateFavCount');
      });
  }
}

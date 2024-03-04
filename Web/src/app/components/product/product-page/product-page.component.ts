import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { DealService } from 'src/app/services/deal.service';
import { EventService } from 'src/app/services/event.service';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/user.service';
import {
  fadeIndAndFadeOutAnimation,
  hoverInAndOutAnimation,
  inAndOutAnimation,
} from 'src/common/animations';
import { Cart } from 'src/common/models/cart';
import { DealCheckerResponse } from 'src/common/models/dealCheckerResponse';
import { Product } from 'src/common/models/product';
import { State } from 'src/common/models/state';
import { User } from 'src/common/models/user';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  animations: [
    fadeIndAndFadeOutAnimation,
    hoverInAndOutAnimation,
    inAndOutAnimation,
  ],
})
export class ProductPageComponent {
  product!: Product;
  id!: number;
  isLoaded: Boolean = false;
  isStock!: boolean;
  user!: User;
  bigImgUrl!: string;
  dealChecker!: DealCheckerResponse;

  isFav!: boolean;

  state: State = {
    animation: {
      img: 'out',
      btn: 'leave',
      imgs: [],
      page: 'out',
      fav: 'leave',
    },
  };

  constructor(
    private prodServ: ProductService,
    private route: ActivatedRoute,
    private stockServ: StockService,
    private cartServ: CartService,
    private router: Router,
    private eventServ: EventService,
    private userServ: UserService,
    private dealServ: DealService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];
    });
    console.log(this.id);
    // if (localStorage.getItem('product')) {
    //   let prod = JSON.parse(localStorage.getItem('product') as string);
    //   if (prod.id == this.id) {
    //     this.product = prod;
    //     this.isLoaded = true;
    //   }
    // } else {
    this.getById(this.id);
    this.checkDeal();
    localStorage.setItem('product', JSON.stringify(this.product));
    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user') as string);
    }
    setTimeout(() => {
      this.state.animation.page = 'in';
    }, 100);
  }

  getById(id: number) {
    this.prodServ.getById(id).subscribe((data: any) => {
      this.product = data;
      this.bigImgUrl = this.product.imageUrl[0];
      let counter = 0;
      this.product.imageUrl.forEach((img) => {
        this.state.animation.imgs.push({ id: counter, state: 'leave' });
        counter += 1;
      });
      setTimeout(() => {
        this.state.animation.img = 'in';
      }, 200);
      this.checkStock();
      this.checkFav(id);
    });
  }

  checkDeal() {
    this.dealServ.checkProductHasDeal(this.id).subscribe((data: any) => {
      this.dealChecker = data;
      this.isLoaded = true;
    });
  }

  changePicture(url: string) {
    setTimeout(() => {
      this.state.animation.img = 'out';
    }, 50);
    setTimeout(() => {
      this.bigImgUrl = url;
      this.state.animation.img = 'in';
    }, 200);
  }

  checkStock() {
    this.stockServ
      .checkStock(this.product.product_id as number)
      .subscribe((data: any) => {
        console.log(data);
        this.isStock = data.stock;
      });
  }

  addToCart() {
    console.log(this.product);
    if (this.product) {
      const cart = {} as Cart;
      cart.cantidad = 1;
      cart.product = this.product;
      cart.user_id = this.user.user_id as number; //TODO
      cart.total = this.product.price * cart.cantidad;
      if (localStorage.getItem('carts')) {
        const carts: Array<Cart> = JSON.parse(
          localStorage.getItem('carts') as string
        );
        carts.push(cart);
        localStorage.removeItem('carts');
        localStorage.setItem('carts', JSON.stringify(carts));
      }
      this.cartServ.create(cart).subscribe((cartResponse: any) => {
        this.eventServ.emit('updateCartCounter', true);
        this.router.navigate(['/purchase']);
      });
    }
  }

  checkFav(id: number) {
    return this.userServ.favChecker(id as number).subscribe((data: any) => {
      this.isFav = data.isFav;
      console.log('is fav?: ', this.isFav);
    });
  }

  handleFav() {
    const id = this.product.product_id;
    if (id)
      this.userServ.favHandler(id).subscribe((data: any) => {
        this.user.favourites = data.userFavs;
        if (data.action == 'added') {
          this.isFav = true;
        } else {
          this.isFav = false;
        }
      });
  }
}

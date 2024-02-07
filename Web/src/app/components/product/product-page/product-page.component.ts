import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';
import { Cart } from 'src/common/models/cart';
import { Product } from 'src/common/models/product';
import { User } from 'src/common/models/user';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  product!: Product;
  id!: number;
  isLoaded: Boolean = false;
  isStock!: boolean;
  user!: User;

  constructor(
    private prodServ: ProductService,
    private route: ActivatedRoute,
    private stockServ: StockService,
    private cartServ: CartService,
    private router: Router
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
    localStorage.setItem('product', JSON.stringify(this.product));
    this.isLoaded = true;
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user') as string);
    }
  }

  getById(id: number) {
    this.prodServ.getById(id).subscribe((data: any) => {
      this.product = data;
      this.checkStock();
    });
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
        this.router.navigate(['/purchase']);
      });
    }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Cart } from 'src/common/models/cart';
import { Discount } from 'src/common/models/discount';
import { Product } from 'src/common/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  @Output() displayOrders = new EventEmitter<boolean>();
  products: Array<Cart> = [];
  total!: number;
  subtotal!: number;

  discounts: Array<Discount> = [];
  successOperation: boolean = false;
  failOperation: boolean = false;

  constructor(private cartServ: CartService) {}

  ngOnInit() {
    if (localStorage.getItem('carts')) {
      this.products = JSON.parse(localStorage.getItem('carts') as string);
    }
    let i = 0;
    this.calcPriceToPay(i);
  }

  removeFromCart(cart: Cart) {
    this.products = this.products.filter((prod) => prod != cart);
    localStorage.setItem('carts', JSON.stringify(this.products));
    this.calcPriceToPay(0);
  }

  saveCarts() {
    let arrChecker: Array<Cart> = [];
    console.log(this.products);
    let cartSuccesCounter = 0;
    for (const cart of this.products) {
      // cart.total = cart.product.price * cart.cantidad;
      this.cartServ.create(cart).subscribe((data: any) => {
        console.log(data);
        console.log(cart);
        if (data.product.id == cart.product.product_id) {
          console.log('yeah');
          arrChecker.push(data);
        }
      });
      cartSuccesCounter += 1;
    }

    console.log(this.products.length, ' ', cartSuccesCounter);
    if (this.products.length == cartSuccesCounter) this.successOperation = true;
    //localStorage.setItem('carts', JSON.stringify(this.products));
    // if (this.successOperation) localStorage.removeItem('carts');

    setTimeout(() => {
      this.displayOrders.emit(true);
    }, 3000);
  }

  goNext() {
    this.displayOrders.emit(true);
  }

  calcSubTotal() {
    let total = 0;
    if (this.products.length > 0) {
      for (let cart of this.products) {
        total += cart.cantidad * cart.product.price;
      }
      return parseFloat(total.toFixed(2));
    } else return total;
  }

  calcTotal() {
    let total = 0;
    if (this.products.length > 0) {
      this.products.forEach((cart: any) => {
        const discountedItem = this.discounts.find(
          (disc: any) => disc.product == cart.product
        );
        if (discountedItem) {
          let subtotal = cart.cantidad * cart.product.price;
          total += subtotal - (discountedItem.discount * subtotal) / 100;
        } else {
          total += cart.cantidad * cart.product.price;
        }
      });
      return parseFloat(total.toFixed(2));
    } else return total;
  }

  calcPriceToPay(index: number) {
    if (this.products.length > 0) {
      this.products[index].cantidad = Math.floor(this.products[index].cantidad);
    }
    this.total = this.calcSubTotal();
    this.subtotal = this.calcTotal();
  }
}

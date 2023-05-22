import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { ShopOrderService } from 'src/app/services/shop-order.service';
import { Cart } from 'src/common/models/cart';
import { Order } from 'src/common/models/order';
import { Product } from 'src/common/models/product';
import { Purchase } from 'src/common/models/purchase';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  @Output() showCart = new EventEmitter<boolean>();
  @Output() successPurchase = new EventEmitter<Array<Order>>();
  @Output() showSuccess = new EventEmitter<Array<Order>>();
  carts!: Array<Cart>;
  orders: Array<Order> = [];

  isLoaded: boolean = false;
  orderSuccess: boolean = false;
  purchaseSucces: boolean = false;

  constructor(
    private cartServ: CartService,
    private ordServ: ShopOrderService,
    private purchServ: PurchaseService
  ) {}

  ngOnInit() {
    this.cartServ.getByUserId(1).subscribe((data: any) => {
      this.carts = data;
      this.isLoaded = true;
    });
  }
  calcTotal() {
    let total = 0;
    for (let cart of this.carts as Array<Cart>) {
      total += cart.total as number;
    }
    return parseFloat(total.toFixed(2));
  }

  goBack() {
    this.showCart.emit(true);
  }

  goNext() {
    this.showSuccess.emit(this.orders);
  }

  confirmOrders() {
    setTimeout(() => {
      this.orderSuccess = true;
    }, 2000);

    for (let cart of this.carts) {
      this.ordServ.create(cart).subscribe((data: any) => {
        this.orders.push(data);
      });
    }
  }

  makePurchase() {
    const purchase: Purchase = {
      orders: this.orders,
      user_id: 1,
    };
    this.purchServ.create(purchase).subscribe((data: any) => {
      this.purchaseSucces = true;
      localStorage.removeItem('cart');
      this.successPurchase.emit(data.orders);
    });
  }
}
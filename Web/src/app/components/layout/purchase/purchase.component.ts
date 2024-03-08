import { Component } from '@angular/core';
import { MobileCheckerService } from 'src/app/services/ui/mobile-checker.service';
import {
  fadeIndAndFadeOutAnimation,
  inAndOutAnimation,
} from 'src/common/animations';
import { Order } from 'src/common/models/order';
import { State } from 'src/common/models/state';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  animations: [inAndOutAnimation, fadeIndAndFadeOutAnimation],
})
export class PurchaseComponent {
  isMobile!: boolean;
  isCartOpen: boolean = true;
  isOrderOpen: boolean = false;
  isSuccessOpen: boolean = false;

  orders!: Array<Order>;

  state: State = {
    actualTab: 'cart',
    animation: {
      lateral: 'out',
      cart: 'out',
      order: 'out',
      success: 'out',
    },
  };

  constructor(private mobileChecker: MobileCheckerService) {}

  ngOnInit() {
    this.isMobile = this.mobileChecker.getIsMobile();
    setTimeout(() => {
      this.state.animation.lateral = 'in';
      this.state.animation.cart = 'in';
    }, 200);
  }

  showOrders() {
    this.isCartOpen = !this.isCartOpen;
    this.isOrderOpen = !this.isOrderOpen;
    if (this.isCartOpen) this.changeTab('cart');
    else this.changeTab('order');
  }

  purchaseComplete(list: Array<Order>) {
    this.isCartOpen = false;
    this.isOrderOpen = false;
    this.isSuccessOpen = true;
    this.orders = list;
    if (this.isSuccessOpen) this.changeTab('success');
  }

  changeTab(tab: string) {
    if (tab == 'cart') {
      this.isCartOpen = true;
      this.isOrderOpen = false;
      this.isSuccessOpen = false;
      setTimeout(() => {
        this.state.animation.cart = 'in';
        this.state.animation.order = 'out';
        this.state.animation.success = 'out';
      }, 150);
    }
    if (tab == 'order') {
      this.isCartOpen = false;
      this.isOrderOpen = true;
      this.isSuccessOpen = false;
      setTimeout(() => {
        this.state.animation.cart = 'out';
        this.state.animation.order = 'in';
        this.state.animation.success = 'out';
      }, 150);
    }
    if (tab == 'success') {
      this.isCartOpen = false;
      this.isOrderOpen = false;
      this.isSuccessOpen = true;
      setTimeout(() => {
        this.state.animation.cart = 'out';
        this.state.animation.order = 'out';
        this.state.animation.success = 'in';
      }, 150);
    }
  }
}

import { Component } from '@angular/core';
import { MobileCheckerService } from 'src/app/services/ui/mobile-checker.service';
import { Order } from 'src/common/models/order';
import { State } from 'src/common/models/state';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent {
  isMobile!: boolean;
  isCartOpen: boolean = true;
  isOrderOpen: boolean = false;
  isSuccessOpen: boolean = false;

  orders!: Array<Order>;

  state: State = {
    actualTab: 'cart',
  };

  constructor(private mobileChecker: MobileCheckerService) {}

  ngOnInit() {
    this.isMobile = this.mobileChecker.getIsMobile();
  }

  showOrders() {
    this.isCartOpen = !this.isCartOpen;
    this.isOrderOpen = !this.isOrderOpen;
  }

  purchaseComplete(list: Array<Order>) {
    this.isCartOpen = false;
    this.isOrderOpen = false;
    this.isSuccessOpen = true;
    this.orders = list;
  }

  changeTab(tab: string) {
    if (tab == 'cart') {
      this.isCartOpen = true;
      this.isOrderOpen = false;
      this.isSuccessOpen = false;
    }
    if (tab == 'order') {
      this.isCartOpen = false;
      this.isOrderOpen = true;
      this.isSuccessOpen = false;
    }
    if (tab == 'success') {
      this.isCartOpen = false;
      this.isOrderOpen = false;
      this.isSuccessOpen = true;
    }
  }
}

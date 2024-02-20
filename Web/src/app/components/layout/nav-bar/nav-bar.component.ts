import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { hoverInAndOutAnimationNav } from 'src/common/animations';
import { API_URL } from 'src/common/common';
import { Cart } from 'src/common/models/cart';
import { State } from 'src/common/models/state';
import { User } from 'src/common/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations: [hoverInAndOutAnimationNav],
})
export class NavBarComponent {
  user!: User;
  loggedIn = false;
  URL = `${API_URL}auth/google`;
  isAdmin = false;
  cart_counter = 0;

  state: State = {
    animation: {
      btn_home: 'leave',
      btn_catalog: 'leave',
      btn_cart: 'leave',
      btn_admin: 'leave',
      btn_profile: 'leave',
      btn_signInOut: 'leave',
    },
  };

  constructor(private eventServ: EventService) {}

  ngOnInit(): void {
    // setTimeout(() => {
    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user') as string);
      this.loggedIn = true;
      if (this.user.roles.includes('ADMIN')) {
        console.log('es admin!');
        this.isAdmin = true;
      }
    }
    const carts: Array<Cart> = JSON.parse(
      localStorage.getItem('carts') as string
    );
    if (carts) {
      this.cart_counter = carts.length;
    }
    // }, 1000);
    this.eventServ.subscribe('updateCartCounter').subscribe((data) => {
      if (data) {
        console.log('UPDATING CART...');
        console.log(data);
        this.cart_counter += 1;
      } else this.cart_counter -= 1;
      if (this.cart_counter < 0) this.cart_counter = 0;
    });
    this.eventServ.subscribe('clearCart').subscribe((data) => {
      this.cart_counter = 0;
    });
  }

  handleAuth() {
    if (this.loggedIn) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      this.loggedIn = false;
      this.isAdmin = false;
    } else {
      window.location.href = this.URL;
    }
  }
}

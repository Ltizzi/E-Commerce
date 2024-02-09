import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { API_URL } from 'src/common/common';
import { Cart } from 'src/common/models/cart';
import { User } from 'src/common/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  user!: User;
  loggedIn = false;
  URL = `${API_URL}auth/google`;
  isAdmin = false;
  cart_counter = 0;

  constructor(private eventServ: EventService) {}

  ngOnInit(): void {
    // setTimeout(() => {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user') as string);
      this.loggedIn = true;
      if (this.user.roles.includes('ADMIN')) {
        console.log('es admin!');
        this.isAdmin = true;
      }
    }
    const carts: Array<Cart> = JSON.parse(
      localStorage.getItem('carts') as string
    );
    this.cart_counter = carts.length;
    // }, 1000);
    this.eventServ.subscribe('updateCartCounter').subscribe((data) => {
      if (data) {
        this.cart_counter += 1;
      } else this.cart_counter -= 1;
      if (this.cart_counter < 0) this.cart_counter = 0;
    });
  }

  handleAuth() {
    if (this.loggedIn) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.loggedIn = false;
      this.isAdmin = false;
    } else {
      window.location.href = this.URL;
    }
  }
}

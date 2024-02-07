import { Component } from '@angular/core';
import { User } from 'src/common/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  user!: User;
  loggedIn = false;
  URL_DEV = 'http://localhost:8080/auth/google';
  URL_PRODUCTION = '';

  ngOnInit(): void {
    setTimeout(() => {
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user') as string);
        this.loggedIn = true;
      }
    }, 1000);
  }

  handleAuth() {
    if (this.loggedIn) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.loggedIn = false;
    } else {
      window.location.href = this.URL_DEV || this.URL_PRODUCTION;
    }
  }
}

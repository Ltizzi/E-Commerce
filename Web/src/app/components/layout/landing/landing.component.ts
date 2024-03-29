import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/ui/search.service';
import {
  fadeIndAndFadeOutAnimation,
  hoverInAndOutAnimation,
  inAndOutAnimation,
} from 'src/common/animations';
import { State } from 'src/common/models/state';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [
    inAndOutAnimation,
    fadeIndAndFadeOutAnimation,
    hoverInAndOutAnimation,
  ],
})
export class LandingComponent {
  state: State = {
    animation: {
      img: 'out',
      text: 'out',
      btn: 'leave',
      btnFeatured: 'leave',
    },
  };

  constructor(
    private authServ: AuthService,
    private eventServ: EventService,
    private prodSerV: ProductService,
    private searchServ: SearchService
  ) {}

  ngOnInit(): void {
    this.authServ.getUser().subscribe((data: any) => {
      console.log(data);
      sessionStorage.setItem('user', JSON.stringify(data));
      if (data.user_id) {
        this.eventServ.emit('loggedIn');
      }
    });
    if (!sessionStorage.getItem('products')) {
      this.prodSerV.getAll().subscribe((data: any) => {
        const products = data;
        sessionStorage.setItem('products', JSON.stringify(products));
        this.searchServ.setProducts(products);
      });
    }

    setTimeout(() => {
      this.state.animation.img = 'in';
      this.state.animation.text = 'in';
    }, 200);
  }
}

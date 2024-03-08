import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products-panel',
  templateUrl: './products-panel.component.html',
  styleUrls: ['./products-panel.component.css'],
  animations: [
    trigger('inAndOut', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0px) scale(1)',
        })
      ),
      state(
        'out',
        style({
          display: 'none',
          opacity: 0,
          transform: 'translateX(-200px) scale(0.7)',
        })
      ),
      transition('out=>in', animate(150)),
    ]),
    trigger('hoverLeave', [
      state('hover', style({ transform: 'scale(1.1)' })),
      state('leave', style({ transform: 'scale(1)' })),
      transition('leave<=>hover', animate(150)),
    ]),
  ],
})
export class ProductsPanelComponent {
  showNewProductModal: boolean = false;
  showbtn = 'out';

  ngOnInit(): void {
    setTimeout(() => {
      this.showbtn = 'in';
    }, 150);
  }

  openModal() {
    this.showNewProductModal = true;
  }

  closeModal() {
    console.log('cerrando');
    this.showNewProductModal = false;
  }
}

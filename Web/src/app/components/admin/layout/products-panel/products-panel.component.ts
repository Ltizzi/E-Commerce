import { Component } from '@angular/core';

@Component({
  selector: 'app-products-panel',
  templateUrl: './products-panel.component.html',
  styleUrls: ['./products-panel.component.css'],
})
export class ProductsPanelComponent {
  showNewProductModal: boolean = false;

  openModal() {
    this.showNewProductModal = true;
  }

  closeModal() {
    console.log('cerrando');
    this.showNewProductModal = false;
  }
}

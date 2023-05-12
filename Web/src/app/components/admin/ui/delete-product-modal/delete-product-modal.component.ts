import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css'],
})
export class DeleteProductModalComponent {
  @Input('data') show!: boolean;
  @Input('product') product!: any;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() reloadProducts = new EventEmitter<boolean>();

  successOperation: boolean = false;

  constructor(private prodServ: ProductService) {}

  close() {
    this.show = !this.show;
    this.closeModal.emit(this.show);
  }

  open() {
    this.show = !this.show;
  }

  deleteProduct() {
    this.prodServ.delete(this.product.id).subscribe((data) => {
      this.successOperation = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    });
  }
}

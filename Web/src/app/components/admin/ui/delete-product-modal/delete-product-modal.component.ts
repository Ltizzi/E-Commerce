import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
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

  constructor(
    private prodServ: ProductService,
    private eventServ: EventService
  ) {}

  close() {
    this.show = !this.show;
    this.closeModal.emit(this.show);
  }

  open() {
    this.show = !this.show;
  }

  deleteProduct() {
    this.prodServ.delete(this.product.id).subscribe((data) => {
      this.eventServ.emit('updateProducts');
      this.successOperation = true;
      setTimeout(() => {
        this.successOperation = false;
        this.show = false;
      }, 3000);
    });
  }
}

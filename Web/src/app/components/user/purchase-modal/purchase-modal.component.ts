import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { Purchase } from 'src/common/models/purchase';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrl: './purchase-modal.component.css',
})
export class PurchaseModalComponent {
  //@Input('modal_show') show!: boolean;
  @Input('purchase') purchase!: Purchase;
  @Output() closeModal = new EventEmitter<boolean>();

  page = 0;
  pages!: Array<any>;
  showNav = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.appendChild(document.body, this.el.nativeElement);
    console.log(this.purchase);
    this.pages = this.paginatePurchases();
  }

  ngOnDestroy(): void {
    this.renderer.removeChild(document.body, this.el.nativeElement);
  }

  open(): void {
    //   this.show = !this.show;
  }

  close(): void {
    //  this.show = !this.show;
    this.closeModal.emit(false);
  }

  pageBack() {
    if (this.page > 0) this.page -= 1;
  }

  pageNext() {
    if (this.page < this.pages.length - 1) this.page += 1;
  }

  paginatePurchases() {
    const orders = this.purchase.orders;
    let pagination: any = [];
    let temporalPages: any = [];

    if (orders.length > 5) {
      this.showNav = true;
      orders.forEach((order: any, index) => {
        if (temporalPages.length < 5) {
          temporalPages.push(order);
        }
        if (temporalPages.length === 5 || orders.length - 1 == index) {
          pagination.push(temporalPages);
          temporalPages = [];
        }
      });
    } else pagination.push(orders);
    return pagination;
  }
}

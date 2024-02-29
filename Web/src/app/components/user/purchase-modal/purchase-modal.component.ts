import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import {
  fadeIndAndFadeOutAnimation,
  simpleFadeInAndFadeOutAnimation,
} from 'src/common/animations';
import { Product } from 'src/common/models/product';
import { Purchase } from 'src/common/models/purchase';
import { State } from 'src/common/models/state';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrl: './purchase-modal.component.css',
  animations: [fadeIndAndFadeOutAnimation, simpleFadeInAndFadeOutAnimation],
})
export class PurchaseModalComponent {
  //@Input('modal_show') show!: boolean;
  @Input('purchase') purchase!: Purchase;
  @Input('productList') productList!: Array<Product>;
  @Input('user_id') user_id!: number;
  @Output() closeModal = new EventEmitter<boolean>();

  page = 0;
  pages!: Array<any>;
  showNav = false;

  reviewProductId!: number;

  state: State = {
    actualTab: 'list',
    animation: {
      modal: 'out',
      list: 'out',
      review: 'out',
    },
  };

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private eventServ: EventService
  ) {}

  ngOnInit(): void {
    this.renderer.appendChild(document.body, this.el.nativeElement);
    console.log(this.purchase);
    this.pages = this.paginatePurchases();
    this.eventServ.subscribe('reviewProduct').subscribe((data: any) => {
      this.reviewProductId = data;
      this.state.actualTab = 'review';
      setTimeout(() => {
        this.state.animation.review = 'in';
      }, 50);
    });
    this.eventServ.subscribe('backToList').subscribe(() => {
      this.state.actualTab = 'list';
    });
    setTimeout(() => {
      this.state.animation.modal = 'in';
      this.state.animation.list = 'in';
    }, 100);
  }

  ngOnDestroy(): void {
    this.renderer.removeChild(document.body, this.el.nativeElement);
    setTimeout(() => {
      this.state.animation = 'in';
    }, 100);
  }

  open(): void {
    //   this.show = !this.show;
  }

  close(): void {
    //  this.show = !this.show;
    setTimeout(() => {
      this.state.animation = 'out';
    }, 100);
    this.closeModal.emit(false);
  }

  pageBack() {
    setTimeout(() => {
      this.state.animation.list = 'out';
    }, 75);
    setTimeout(() => {
      if (this.page > 0) this.page -= 1;
      this.state.animation.list = 'in';
    }, 200);
  }

  pageNext() {
    setTimeout(() => {
      this.state.animation.list = 'out';
    }, 75);
    setTimeout(() => {
      if (this.page < this.pages.length - 1) this.page += 1;
      this.state.animation.list = 'in';
    }, 200);
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

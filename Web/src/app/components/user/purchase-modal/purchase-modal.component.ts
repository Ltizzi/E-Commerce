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

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.appendChild(document.body, this.el.nativeElement);
    console.log(this.purchase);
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
}

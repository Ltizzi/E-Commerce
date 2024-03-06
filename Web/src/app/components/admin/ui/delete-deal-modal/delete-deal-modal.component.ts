import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DealService } from 'src/app/services/deal.service';
import { EventService } from 'src/app/services/event.service';
import { Deal } from 'src/common/models/deal';

@Component({
  selector: 'app-delete-deal-modal',
  templateUrl: './delete-deal-modal.component.html',
  styleUrl: './delete-deal-modal.component.css',
})
export class DeleteDealModalComponent {
  @Input('show') show!: boolean;
  @Input('deal') deal!: Deal;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() reloadDeals = new EventEmitter<boolean>();

  successOperation: boolean = false;

  constructor(private dealServ: DealService, private eventServ: EventService) {}

  deleteDeal() {
    this.dealServ.delete(this.deal.deal_id as number).subscribe((data: any) => {
      this.eventServ.emit('updateDeals');
      this.successOperation = true;
      setTimeout(() => {
        this.successOperation = false;
        this.show = false;
      }, 2000);
    });
  }

  close() {
    this.show = !this.show;
    this.closeModal.emit(this.show);
  }
}

import { Component, Input } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-btn',
  templateUrl: './review-btn.component.html',
  styleUrl: './review-btn.component.css',
})
export class ReviewBtnComponent {
  @Input('product_id') product_id!: number;
  @Input('user_id') user_id!: number;

  reviewedAlready!: boolean;

  constructor(
    private reviewServ: ReviewService,
    private eventServ: EventService
  ) {}

  ngOnInit(): void {
    this.reviewServ
      .checkReview(this.user_id, this.product_id)
      .subscribe((data: any) => {
        this.reviewedAlready = data.alreadyReviewed;
      });
  }

  reviewProduct() {
    this.eventServ.emit('reviewProduct', this.product_id);
  }
}

import { Component, Input } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/common/models/review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css',
})
export class ReviewListComponent {
  @Input('product_id') product_id!: number | undefined;
  reviews!: Array<Review>;

  PAGE = 1;
  PAGESIZE = 3;

  constructor(private reviewServ: ReviewService) {}

  ngOnInit(): void {
    if (this.product_id) {
      this.reviewServ
        .getReviewsFromProductIdWithPagination(
          this.product_id,
          this.PAGE,
          this.PAGESIZE
        )
        .subscribe((data: any) => {
          this.reviews = data;
        });
    }
  }
}

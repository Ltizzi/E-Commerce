import { Component, Input } from '@angular/core';
import { Review } from 'src/common/models/review';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-user-review-list',
  templateUrl: './user-review-list.component.html',
  styleUrl: './user-review-list.component.css',
})
export class UserReviewListComponent {
  userReviews!: Array<Review>;
  @Input('user_id') user_id!: number;

  constructor(private reviewServ: ReviewService) {}

  ngOnInit(): void {
    this.reviewServ.getByUserId(this.user_id).subscribe((data: any) => {
      this.userReviews = data;
    });
  }
}

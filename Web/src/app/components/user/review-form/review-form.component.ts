import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/common/models/review';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css',
})
export class ReviewFormComponent {
  @Input('user_id') user_id!: number;
  @Input('product_id') product_id!: number;
  filledStars!: number;
  previousFilled: number = 0;
  preHover: number = 0;

  noRating!: boolean;
  successOperation!: boolean;

  constructor(
    private eventServ: EventService,
    private reviewServ: ReviewService
  ) {}

  newReviewForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
  });

  errorMessages = {
    rating: { type: 'required', message: 'Rating is required' },
    text: [
      { type: 'required', message: 'Comment is required' },
      { type: 'minLength', message: 'Comment requires at least 2 characters' },
      { type: 'maxLength', message: 'Comment has a maximum of 100 characters' },
    ],
  };

  submitForm() {
    if (this.filledStars > 0 && this.filledStars <= 5) {
      if (this.newReviewForm.valid) {
        let newReview: Review = {
          user_id: this.user_id,
          product_id: this.product_id,
          rating: this.filledStars,
          text: this.newReviewForm.value.text as string,
        };
        console.log('REVIEW');
        console.log(newReview);
        this.reviewServ.create(newReview).subscribe((data) => {
          this.successOperation = true;
          this.eventServ.emit('backToList');
          this.eventServ.emit('updateReviewCounter');
        });
      }
    }
  }

  fillStar(num: number) {
    this.previousFilled = this.filledStars;
    this.filledStars = num;
    this.noRating = false;
  }

  handleHover(num: number) {
    this.preHover = this.filledStars;
    if (this.previousFilled == this.preHover) {
      this.previousFilled = this.filledStars;
    }
    this.filledStars = num;
  }

  handleLeave() {
    this.filledStars = this.previousFilled;
  }

  goBack() {
    this.eventServ.emit('backToList');
  }
}

import { Component, Input } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/common/models/product';
import { Review } from 'src/common/models/review';
import { User } from 'src/common/models/user';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  @Input('review') review!: Review;
  user!: User;

  constructor(private userServ: UserService) {}

  ngOnInit(): void {
    this.userServ.getById(this.review.user_id).subscribe((data: any) => {
      this.user = data;
    });
  }
}

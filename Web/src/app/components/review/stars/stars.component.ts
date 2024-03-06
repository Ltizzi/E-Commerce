import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  standalone: false,
  // imports: [CommonModule],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.css',
})
export class StarsComponent {
  @Input('rating') rating!: number;
  emptyStars = 0;
  filledStars = 0;
  partialFill = 0;

  ngOnInit(): void {
    this.emptyStars = Math.floor(5 - this.rating);
    this.filledStars = Math.floor(this.rating);
    this.partialFill = this.rating - this.filledStars;
    console.log('STARS');
    console.log('filled:');
    console.log(this.filledStars);
    console.log('partial:');
    console.log(this.partialFill);
    console.log('empty:');
    console.log(this.emptyStars);
  }
}

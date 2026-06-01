import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-rating-stars',
  imports: [DecimalPipe],
  template: `
    <div class="rating">
      <span class="star">★</span>
      <span class="val">{{ rating | number: '1.1-1' }}/5</span>
    </div>
  `,
  styles: `
    .rating {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.825rem;
      font-weight: 500;
    }
    .star {
      color: #fbbf24; /* Warm gold star */
      font-size: 0.95rem;
    }
    .val {
      color: #9ca3af; /* Muted slate rating */
    }
  `,
})
export class RatingStars {
  @Input({ required: true }) rating!: number;
  @Input() count?: number;
}

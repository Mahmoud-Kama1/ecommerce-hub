import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-rating-stars',
  imports: [DecimalPipe],
  template: `
    <div class="rating">
      <span>{{ rating | number: '1.1-1' }} ★</span>
      @if (count != null) {
        <span class="count">({{ count }})</span>
      }
    </div>
  `,
  styles: `
    .rating {
      color: #f59e0b;
      font-size: 0.875rem;
    }
    .count {
      color: var(--text-muted);
      margin-left: 0.25rem;
    }
  `,
})
export class RatingStars {
  @Input({ required: true }) rating!: number;
  @Input() count?: number;
}

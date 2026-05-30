import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RatingStars } from '../../../../shared/components/rating-stars/rating-stars/rating-stars';

interface UserReview {
  id: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

@Component({
  selector: 'app-reviews',
  imports: [RouterLink, DatePipe, RatingStars],
  templateUrl: './reviews.html',
})
export class Reviews {
  readonly reviews: UserReview[] = [
    {
      id: 'rev-1',
      productName: 'Wireless Headphones',
      rating: 5,
      comment: 'Excellent sound quality and battery life.',
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
    {
      id: 'rev-2',
      productName: 'Classic Denim Jacket',
      rating: 4,
      comment: 'Great fit, runs slightly large.',
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    },
  ];
}

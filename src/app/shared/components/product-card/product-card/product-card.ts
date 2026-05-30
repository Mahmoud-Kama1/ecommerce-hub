import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../core/models/product.model';
import { RatingStars } from '../../rating-stars/rating-stars/rating-stars';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, RatingStars, DecimalPipe],
  templateUrl: './product-card.html',
  styles: `
    .product-card {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      height: 100%;
    }
    .image {
      aspect-ratio: 4 / 3;
      background: #eef2ff;
      border-radius: 0.5rem;
      overflow: hidden;
      display: grid;
      place-items: center;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    .image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .price-row {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
    }
    .price {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--primary);
    }
    .compare {
      text-decoration: line-through;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    .stock-out {
      color: var(--danger);
      font-size: 0.875rem;
    }
    a.title {
      color: inherit;
      text-decoration: none;
      font-weight: 600;
    }
  `,
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
}

import { Component, Input, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../core/models/product.model';
import { RatingStars } from '../../rating-stars/rating-stars/rating-stars';
import { CartService } from '../../../../core/services/cart.service';

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
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      box-shadow: var(--card-shadow);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    .product-card:hover {
      transform: translateY(-5px);
      border-color: var(--border-active);
      box-shadow: 0 15px 35px rgba(99, 102, 241, 0.15);
    }
    .image {
      aspect-ratio: 1 / 1;
      background: #0f131f;
      border-radius: 8px;
      overflow: hidden;
      display: grid;
      place-items: center;
      color: var(--text-muted);
      font-size: 0.875rem;
      border: 1px solid rgba(255, 255, 255, 0.04);
      margin-bottom: 4px;
    }
    .image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .product-card:hover .image img {
      transform: scale(1.05);
    }
    .price-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 0.5rem;
      margin-top: auto;
    }
    .price {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-bright);
    }
    .compare {
      text-decoration: line-through;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    .stock-out {
      color: var(--danger);
      font-size: 0.875rem;
      font-weight: 600;
      background: rgba(244, 63, 94, 0.1);
      padding: 4px 8px;
      border-radius: 4px;
      text-align: center;
      margin-top: auto;
    }
    a.title {
      color: var(--text-bright);
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      font-family: 'Outfit', sans-serif;
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
    a.title:hover {
      color: var(--primary);
    }
    .btn-add-cart {
      width: 100%;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 8px;
      font-family: 'Outfit', sans-serif;
    }
    .btn-add-cart:hover:not(:disabled) {
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(88, 80, 236, 0.35);
    }
    .btn-add-cart:disabled {
      background: #1f2937;
      color: var(--text-muted);
      cursor: not-allowed;
    }
  `,
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  
  private cartService = inject(CartService);

  addToCart(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.product && this.product.stock > 0) {
      this.cartService.addItem({
        productId: this.product.id,
        name: this.product.name,
        price: this.product.price,
        imageUrl: this.product.images[0]?.url,
        stock: this.product.stock,
      });
    }
  }
}


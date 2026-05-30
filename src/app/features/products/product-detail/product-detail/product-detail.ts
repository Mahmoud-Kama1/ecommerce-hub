import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../../../../core/services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { Product } from '../../../../core/models/product.model';
import { RatingStars } from '../../../../shared/components/rating-stars/rating-stars/rating-stars';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [DecimalPipe, RouterLink, RatingStars],
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  readonly cartService = inject(CartService);
  readonly wishlist = inject(WishlistService);

  product?: Product;
  notFound = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');

      if (!id) {
        this.notFound = true;
        return;
      }

      this.productService.getProductById(id).subscribe((product) => {
        if (product) {
          this.product = product;
          this.notFound = false;
        } else {
          this.product = undefined;
          this.notFound = true;
        }
      });
    });
  }

  addToCart(): void {
    if (!this.product || this.product.stock === 0) {
      return;
    }

    this.cartService.addItem({
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      imageUrl: this.product.images[0]?.url,
      stock: this.product.stock,
    });
  }

  toggleWishlist(): void {
    if (this.product) {
      this.wishlist.toggle(this.product.id);
    }
  }
}

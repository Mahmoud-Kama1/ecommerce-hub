import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { ProductService } from '../../../../core/services/product.service';
import { ProductCard } from '../../../../shared/components/product-card/product-card/product-card';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, ProductCard],
  templateUrl: './wishlist.html',
})
export class Wishlist implements OnInit {
  readonly wishlist = inject(WishlistService);
  private readonly productService = inject(ProductService);

  products: Product[] = [];
  loading = true;

  ngOnInit(): void {
    const ids = this.wishlist.ids();
    if (ids.length === 0) {
      this.loading = false;
      return;
    }

    forkJoin(ids.map((id) => this.productService.getProductById(id))).subscribe((results) => {
      this.products = results.filter((p): p is Product => !!p);
      this.loading = false;
    });
  }

  remove(productId: string): void {
    this.wishlist.remove(productId);
    this.products = this.products.filter((p) => p.id !== productId);
  }
}

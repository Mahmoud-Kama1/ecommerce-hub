import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../store/products/product.actions';
import { selectProducts, selectProductsLoading } from '../../../store/products/product.reducer';
import { ProductCard } from '../../../shared/components/product-card/product-card/product-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ProductCard, RouterLink, AsyncPipe],
  templateUrl: './home.html',
  styles: `
    .hero {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      color: white;
      border-radius: 1rem;
      padding: 2.5rem;
      margin-bottom: 2rem;
    }
    .hero-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .hero .btn-secondary {
      background: rgba(255, 255, 255, 0.15);
      color: white;
    }
  `,
})
export class Home implements OnInit {
  private readonly store = inject(Store);

  readonly products$ = this.store.select(selectProducts);
  readonly loading$ = this.store.select(selectProductsLoading);

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts({}));
  }
}

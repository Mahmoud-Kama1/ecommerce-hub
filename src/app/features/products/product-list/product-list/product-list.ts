import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ProductActions } from '../../../../store/products/product.actions';
import { selectProducts, selectProductsLoading } from '../../../../store/products/product.reducer';
import { ProductCard } from '../../../../shared/components/product-card/product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ReactiveFormsModule, ProductCard, AsyncPipe],
  templateUrl: './product-list.html',
  styles: `
    .filters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
  `,
})
export class ProductList implements OnInit {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly products$ = this.store.select(selectProducts);
  readonly loading$ = this.store.select(selectProductsLoading);

  readonly filterForm = this.fb.nonNullable.group({
    search: [''],
    minPrice: [''],
    maxPrice: [''],
    inStockOnly: [false],
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const { search, minPrice, maxPrice, inStockOnly } = this.filterForm.getRawValue();
    this.store.dispatch(
      ProductActions.loadProducts({
        filter: {
          search: search || undefined,
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
          inStockOnly,
        },
      }),
    );
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ProductActions } from '../../../../store/products/product.actions';
import { selectProducts, selectProductsLoading } from '../../../../store/products/product.reducer';
import { ProductCard } from '../../../../shared/components/product-card/product-card/product-card';
import { ProductService } from '../../../../core/services/product.service';
import { Category } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ReactiveFormsModule, ProductCard, AsyncPipe],
  templateUrl: './product-list.html',
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
})
export class ProductList implements OnInit {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  readonly products$ = this.store.select(selectProducts);
  readonly loading$ = this.store.select(selectProductsLoading);
  
  readonly categories = signal<Category[]>([]);
  readonly activeCategory = signal<string | null>(null);

  readonly filterForm = this.fb.nonNullable.group({
    search: [''],
    categoryId: [''],
    minPrice: [''],
    maxPrice: [''],
    inStockOnly: [false],
  });

  ngOnInit(): void {
    // Load categories
    this.productService.getCategories().subscribe((cats) => {
      this.categories.set(cats);
    });

    // Load initial products
    this.loadProducts();

    // Auto-apply filters when form values change (except search, which handles keyup/submit)
    this.filterForm.valueChanges.subscribe(() => {
      this.loadProducts();
    });
  }

  selectCategory(categoryId: string | null): void {
    this.activeCategory.set(categoryId);
    this.filterForm.patchValue({ categoryId: categoryId || '' });
    // This value change will trigger valueChanges.subscribe -> loadProducts()
  }

  loadProducts(): void {
    const { search, categoryId, minPrice, maxPrice, inStockOnly } = this.filterForm.getRawValue();
    this.store.dispatch(
      ProductActions.loadProducts({
        filter: {
          search: search || undefined,
          categoryId: categoryId || undefined,
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
          inStockOnly,
        },
      }),
    );
  }
}


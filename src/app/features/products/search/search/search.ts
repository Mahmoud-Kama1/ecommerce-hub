import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ProductActions } from '../../../../store/products/product.actions';
import { selectProducts, selectProductsLoading } from '../../../../store/products/product.reducer';
import { ProductCard } from '../../../../shared/components/product-card/product-card/product-card';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, ProductCard, AsyncPipe],
  templateUrl: './search.html',
})
export class Search implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  readonly products$ = this.store.select(selectProducts);
  readonly loading$ = this.store.select(selectProductsLoading);

  readonly form = this.fb.nonNullable.group({ q: [''] });

  ngOnInit(): void {
    const q = this.route.snapshot.queryParamMap.get('q') ?? '';
    this.form.patchValue({ q });
    this.search();
  }

  search(): void {
    const q = this.form.getRawValue().q;
    this.store.dispatch(ProductActions.loadProducts({ filter: { search: q || undefined } }));
  }
}

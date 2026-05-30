import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ProductActions } from '../../../../store/products/product.actions';
import { selectProducts, selectProductsLoading } from '../../../../store/products/product.reducer';
import { ProductService } from '../../../../core/services/product.service';
import { ProductCard } from '../../../../shared/components/product-card/product-card/product-card';
import { Category } from '../../../../core/models/product.model';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink, ProductCard, AsyncPipe],
  templateUrl: './category-list.html',
})
export class CategoryList implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly productService = inject(ProductService);

  readonly products$ = this.store.select(selectProducts);
  readonly loading$ = this.store.select(selectProductsLoading);

  category?: Category;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.productService.getCategories().subscribe((categories) => {
      this.category = categories.find((c) => c.slug === slug);
      if (this.category) {
        this.store.dispatch(ProductActions.loadProducts({ filter: { categoryId: this.category.id } }));
      }
    });
  }
}

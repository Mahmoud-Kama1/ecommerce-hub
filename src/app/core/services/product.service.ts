import { Injectable, inject } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product, Category, ProductFilter } from '../models/product.model';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../data/mock-catalog';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(filter?: ProductFilter): Observable<Product[]> {
    let products = [...MOCK_PRODUCTS];

    if (filter?.search) {
      const term = filter.search.toLowerCase();
      products = products.filter((p) => p.name.toLowerCase().includes(term));
    }
    if (filter?.categoryId) {
      products = products.filter((p) => p.categoryId === filter.categoryId);
    }
    if (filter?.minPrice != null) {
      products = products.filter((p) => p.price >= filter.minPrice!);
    }
    if (filter?.maxPrice != null) {
      products = products.filter((p) => p.price <= filter.maxPrice!);
    }
    if (filter?.inStockOnly) {
      products = products.filter((p) => p.stock > 0);
    }

    return of(products).pipe(delay(300));
  }

  getProductById(id: string): Observable<Product | undefined> {
    const result = MOCK_PRODUCTS.find((p) => p.id === id);
    return of(result);
  }

  getCategories(): Observable<Category[]> {
    return of(MOCK_CATEGORIES).pipe(delay(200));
  }
}

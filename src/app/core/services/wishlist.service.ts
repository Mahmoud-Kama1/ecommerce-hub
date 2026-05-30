import { Injectable, signal, effect } from '@angular/core';
import { Product } from '../models/product.model';

const STORAGE_KEY = 'ecommerce_wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly productIds = signal<string[]>(this.load());

  readonly ids = this.productIds.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.productIds()));
    });
  }

  toggle(productId: string): void {
    this.productIds.update((ids) =>
      ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId],
    );
  }

  has(productId: string): boolean {
    return this.productIds().includes(productId);
  }

  remove(productId: string): void {
    this.productIds.update((ids) => ids.filter((id) => id !== productId));
  }

  clear(): void {
    this.productIds.set([]);
  }

  private load(): string[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}

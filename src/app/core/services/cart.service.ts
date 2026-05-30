import { Injectable, computed, signal, effect } from '@angular/core';
import { Cart, CartItem, PromoCode } from '../models/cart.model';

const STORAGE_KEY = 'ecommerce_cart';

const MOCK_PROMOS: PromoCode[] = [
  { code: 'WELCOME10', type: 'percentage', value: 10, minOrderAmount: 50, isActive: true },
  { code: 'SAVE20', type: 'fixed', value: 20, minOrderAmount: 100, isActive: true },
];

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = signal<CartItem[]>([]);
  private readonly promoCode = signal<string | undefined>(undefined);
  private readonly discount = signal(0);

  readonly cart = computed<Cart>(() => {
    const cartItems = this.items();
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : subtotal > 0 ? 9.99 : 0;
    const tax = subtotal * 0.08;
    const discount = this.discount();
    const total = Math.max(0, subtotal - discount + shipping + tax);

    return {
      items: cartItems,
      subtotal,
      discount,
      shipping,
      tax,
      total,
      promoCode: this.promoCode(),
    };
  });

  constructor() {
    const saved = this.loadSaved();
    this.items.set(saved.items);
    this.promoCode.set(saved.promoCode);
    this.discount.set(saved.discount);

    effect(() => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items: this.items(), promoCode: this.promoCode(), discount: this.discount() }),
      );
    });
  }

  addItem(item: Omit<CartItem, 'quantity'>, quantity = 1): void {
    this.items.update((current) => {
      const existing = current.find((i) => i.productId === item.productId);
      if (existing) {
        return current.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: Math.min(i.quantity + quantity, i.stock) }
            : i,
        );
      }
      return [...current, { ...item, quantity }];
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this.items.update((current) =>
      current.map((i) => (i.productId === productId ? { ...i, quantity: Math.min(quantity, i.stock) } : i)),
    );
  }

  removeItem(productId: string): void {
    this.items.update((current) => current.filter((i) => i.productId !== productId));
  }

  clear(): void {
    this.items.set([]);
    this.promoCode.set(undefined);
    this.discount.set(0);
  }

  applyPromoCode(code: string): { success: boolean; message: string } {
    const promo = MOCK_PROMOS.find((p) => p.code.toLowerCase() === code.toLowerCase() && p.isActive);
    if (!promo) {
      return { success: false, message: 'Invalid promo code' };
    }

    const subtotal = this.cart().subtotal;
    if (promo.minOrderAmount && subtotal < promo.minOrderAmount) {
      return { success: false, message: `Minimum order of $${promo.minOrderAmount} required` };
    }

    const discount =
      promo.type === 'percentage' ? subtotal * (promo.value / 100) : Math.min(promo.value, subtotal);

    this.promoCode.set(promo.code);
    this.discount.set(discount);
    return { success: true, message: 'Promo code applied' };
  }

  private loadSaved(): { items: CartItem[]; promoCode?: string; discount: number } {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
      return { items: data.items ?? [], promoCode: data.promoCode, discount: data.discount ?? 0 };
    } catch {
      return { items: [], discount: 0 };
    }
  }
}

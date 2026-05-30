import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Order, OrderItem, OrderStatus } from '../models/order.model';
import { Cart } from '../models/cart.model';

const STORAGE_KEY = 'ecommerce_orders';

@Injectable({ providedIn: 'root' })
export class OrderService {
  createOrder(params: {
    userId?: string;
    guestEmail?: string;
    cart: Cart;
    shippingAddress: string;
    paymentMethod: string;
    sellerIds?: string[];
  }): Observable<Order> {
    const now = new Date().toISOString();
    const items: OrderItem[] = params.cart.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    }));

    const order: Order = {
      id: `ORD-${Date.now()}`,
      userId: params.userId,
      guestEmail: params.guestEmail,
      sellerIds: params.sellerIds ?? ['seller-1'],
      items,
      subtotal: params.cart.subtotal,
      discount: params.cart.discount,
      shipping: params.cart.shipping,
      tax: params.cart.tax,
      total: params.cart.total,
      status: 'confirmed',
      statusHistory: [
        { status: 'pending', timestamp: now, note: 'Order placed' },
        { status: 'confirmed', timestamp: now, note: 'Payment confirmed' },
      ],
      shippingAddress: params.shippingAddress,
      paymentMethod: params.paymentMethod,
      promoCode: params.cart.promoCode,
      trackingNumber: `TRK${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      createdAt: now,
      updatedAt: now,
    };

    const orders = this.getAll();
    orders.unshift(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return of(order).pipe(delay(500));
  }

  getOrdersForUser(userId: string): Observable<Order[]> {
    return of(this.getAll().filter((o) => o.userId === userId)).pipe(delay(200));
  }

  getOrderById(id: string): Observable<Order | undefined> {
    return of(this.getAll().find((o) => o.id === id)).pipe(delay(200));
  }

  getAllOrders(): Observable<Order[]> {
    return of(this.getAll()).pipe(delay(200));
  }

  getOrdersForSeller(sellerId: string): Observable<Order[]> {
    return of(this.getAll().filter((o) => o.sellerIds.includes(sellerId))).pipe(delay(200));
  }

  updateOrderStatus(id: string, status: OrderStatus, note?: string): Observable<Order | undefined> {
    const orders = this.getAll();
    const idx = orders.findIndex((o) => o.id === id);
    if (idx < 0) {
      return of(undefined).pipe(delay(200));
    }

    const now = new Date().toISOString();
    orders[idx] = {
      ...orders[idx],
      status,
      updatedAt: now,
      statusHistory: [...orders[idx].statusHistory, { status, timestamp: now, note }],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return of(orders[idx]).pipe(delay(300));
  }

  private getAll(): Order[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}

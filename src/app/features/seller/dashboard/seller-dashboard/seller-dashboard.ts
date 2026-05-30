import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { OrderService } from '../../../../core/services/order.service';
import { MOCK_PRODUCTS } from '../../../../core/data/mock-catalog';

@Component({
  selector: 'app-seller-dashboard',
  imports: [DecimalPipe],
  templateUrl: './seller-dashboard.html',
})
export class SellerDashboard implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly orders = inject(OrderService);

  stats = { products: 0, orders: 0, earnings: 0, pending: 0 };

  ngOnInit(): void {
    const sellerId = this.auth.currentUser()?.role === 'seller' ? 'seller-1' : 'seller-1';
    this.stats.products = MOCK_PRODUCTS.filter((p) => p.sellerId === sellerId).length;
    this.orders.getOrdersForSeller(sellerId).subscribe((list) => {
      this.stats.orders = list.length;
      this.stats.earnings = list.reduce((sum, o) => sum + o.total * 0.85, 0);
      this.stats.pending = list.filter((o) => o.status === 'confirmed').length;
    });
  }
}

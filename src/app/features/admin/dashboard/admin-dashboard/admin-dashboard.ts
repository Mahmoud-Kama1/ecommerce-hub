import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { OrderService } from '../../../../core/services/order.service';
import { MOCK_PRODUCTS } from '../../../../core/data/mock-catalog';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DecimalPipe],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly orders = inject(OrderService);

  stats = { users: 0, products: MOCK_PRODUCTS.length, orders: 0, revenue: 0 };

  ngOnInit(): void {
    this.stats.users = this.auth.getAllUsers().length;
    this.orders.getAllOrders().subscribe((list) => {
      this.stats.orders = list.length;
      this.stats.revenue = list.reduce((sum, o) => sum + o.total, 0);
    });
  }
}

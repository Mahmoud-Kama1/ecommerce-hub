import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/models/order.model';

@Component({
  selector: 'app-admin-orders',
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './admin-orders.html',
})
export class AdminOrders implements OnInit {
  private readonly orderService = inject(OrderService);
  orders: Order[] = [];

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((orders) => (this.orders = orders));
  }

  ship(order: Order): void {
    this.orderService.updateOrderStatus(order.id, 'shipped', 'Shipped by admin').subscribe((updated) => {
      if (updated) {
        order.status = updated.status;
        order.statusHistory = updated.statusHistory;
      }
    });
  }
}

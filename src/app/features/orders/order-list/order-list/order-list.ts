import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { OrderService } from '../../../../core/services/order.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Order } from '../../../../core/models/order.model';

@Component({
  selector: 'app-order-list',
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './order-list.html',
})
export class OrderList implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly auth = inject(AuthService);

  orders = signal<Order[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    const userId = this.auth.currentUser()?.id;
    if (!userId) {
      this.loading.set(false);
      return;
    }

    this.orderService.getOrdersForUser(userId).subscribe((orders) => {
      this.orders.set(orders);
      this.loading.set(false);
    });
  }
}

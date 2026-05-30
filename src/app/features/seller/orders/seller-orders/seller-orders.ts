import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/models/order.model';

@Component({
  selector: 'app-seller-orders',
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './seller-orders.html',
})
export class SellerOrders implements OnInit {
  private readonly orderService = inject(OrderService);
  orders: Order[] = [];

  ngOnInit(): void {
    this.orderService.getOrdersForSeller('seller-1').subscribe((orders) => (this.orders = orders));
  }
}

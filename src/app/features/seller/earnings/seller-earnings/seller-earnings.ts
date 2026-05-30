import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { OrderService } from '../../../../core/services/order.service';

interface Payout {
  date: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-seller-earnings',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './seller-earnings.html',
})
export class SellerEarnings implements OnInit {
  private readonly orderService = inject(OrderService);
  totalEarnings = 0;
  readonly payouts: Payout[] = [];

  ngOnInit(): void {
    this.orderService.getOrdersForSeller('seller-1').subscribe((orders) => {
      this.totalEarnings = orders.reduce((sum, o) => sum + o.total * 0.85, 0);
      orders.slice(0, 5).forEach((o) => {
        this.payouts.push({
          date: o.createdAt,
          amount: o.total * 0.85,
          status: o.status === 'delivered' ? 'Paid' : 'Pending',
        });
      });
    });
  }
}

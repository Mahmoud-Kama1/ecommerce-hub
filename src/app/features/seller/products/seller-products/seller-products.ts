import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_PRODUCTS } from '../../../../core/data/mock-catalog';

@Component({
  selector: 'app-seller-products',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './seller-products.html',
})
export class SellerProducts {
  readonly products = MOCK_PRODUCTS.filter((p) => p.sellerId === 'seller-1');
}

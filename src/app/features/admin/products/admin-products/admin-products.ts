import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_PRODUCTS } from '../../../../core/data/mock-catalog';

@Component({
  selector: 'app-admin-products',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './admin-products.html',
})
export class AdminProducts {
  readonly products = MOCK_PRODUCTS;
}

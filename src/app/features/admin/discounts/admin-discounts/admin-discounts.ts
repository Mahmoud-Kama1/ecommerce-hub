import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.html',
})
export class AdminDiscounts {
  readonly promos = [
    { code: 'WELCOME10', type: '10% off', min: '$50', active: true },
    { code: 'SAVE20', type: '$20 off', min: '$100', active: true },
  ];
}

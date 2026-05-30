import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-loyalty',
  imports: [RouterLink],
  templateUrl: './loyalty.html',
})
export class Loyalty {
  readonly auth = inject(AuthService);

  readonly tiers = [
    { name: 'Bronze', min: 0, benefits: '1 point per $1 spent' },
    { name: 'Silver', min: 500, benefits: 'Free shipping on orders over $50' },
    { name: 'Gold', min: 1500, benefits: 'Early access to sales' },
  ];
}

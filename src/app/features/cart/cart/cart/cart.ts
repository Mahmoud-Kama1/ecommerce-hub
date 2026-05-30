import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [DecimalPipe, RouterLink, FormsModule],
  templateUrl: './cart.html',
})
export class Cart {
  readonly cartService = inject(CartService);
  promoInput = '';

  applyPromo(): void {
    const result = this.cartService.applyPromoCode(this.promoInput);
    alert(result.message);
  }
}

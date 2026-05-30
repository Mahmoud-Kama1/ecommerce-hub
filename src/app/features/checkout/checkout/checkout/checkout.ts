import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';
import { OrderService } from '../../../../core/services/order.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe],
  templateUrl: './checkout.html',
})
export class Checkout {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly auth = inject(AuthService);

  submitting = false;
  error = '';

  readonly form = this.fb.nonNullable.group({
    street: ['123 Main St', Validators.required],
    city: ['Springfield', Validators.required],
    state: ['IL', Validators.required],
    postalCode: ['62701', Validators.required],
    country: ['US', Validators.required],
    paymentMethod: ['card', Validators.required],
  });

  placeOrder(): void {
    if (this.form.invalid || this.cartService.cart().items.length === 0) {
      return;
    }

    const user = this.auth.currentUser();
    if (!user) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/checkout' } });
      return;
    }

    const { street, city, state, postalCode, country, paymentMethod } = this.form.getRawValue();
    const shippingAddress = `${street}, ${city}, ${state} ${postalCode}, ${country}`;

    this.submitting = true;
    this.error = '';

    this.orderService
      .createOrder({
        userId: user.id,
        cart: this.cartService.cart(),
        shippingAddress,
        paymentMethod,
      })
      .subscribe({
        next: (order) => {
          this.cartService.clear();
          this.router.navigate(['/orders', order.id]);
        },
        error: () => {
          this.error = 'Failed to place order. Please try again.';
          this.submitting = false;
        },
      });
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-guest-checkout',
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe],
  templateUrl: './guest-checkout.html',
})
export class GuestCheckout {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);

  submitting = false;
  error = '';

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
    country: ['US', Validators.required],
    paymentMethod: ['card', Validators.required],
  });

  placeOrder(): void {
    if (this.form.invalid || this.cartService.cart().items.length === 0) {
      return;
    }

    const { email, firstName, lastName, street, city, state, postalCode, country, paymentMethod } =
      this.form.getRawValue();
    const shippingAddress = `${firstName} ${lastName}, ${street}, ${city}, ${state} ${postalCode}, ${country}`;

    this.submitting = true;
    this.error = '';

    this.orderService
      .createOrder({
        guestEmail: email,
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

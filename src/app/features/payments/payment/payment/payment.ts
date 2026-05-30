import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe],
  templateUrl: './payment.html',
})
export class Payment {
  private readonly fb = inject(FormBuilder);
  readonly cart = inject(CartService);

  message = '';

  readonly form = this.fb.nonNullable.group({
    cardNumber: ['4242424242424242', [Validators.required, Validators.minLength(16)]],
    expiry: ['12/28', Validators.required],
    cvc: ['123', [Validators.required, Validators.minLength(3)]],
    name: ['Demo User', Validators.required],
  });

  pay(): void {
    if (this.form.invalid) {
      return;
    }
    this.message = 'Payment authorized (mock). Proceed to checkout to complete your order.';
  }
}

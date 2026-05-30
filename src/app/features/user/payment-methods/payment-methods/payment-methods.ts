import { Component, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { PaymentMethod } from '../../../../core/models/user.model';

@Component({
  selector: 'app-payment-methods',
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './payment-methods.html',
})
export class PaymentMethods {
  readonly auth = inject(AuthService);

  get methods(): PaymentMethod[] {
    return this.auth.currentUser()?.paymentMethods ?? [];
  }

  addMockCard(): void {
    const method: PaymentMethod = {
      id: crypto.randomUUID(),
      type: 'card',
      label: 'Mastercard ending 5555',
      last4: '5555',
      brand: 'Mastercard',
      isDefault: this.methods.length === 0,
    };
    this.auth.updateProfile({ paymentMethods: [...this.methods, method] });
  }

  removeMethod(id: string): void {
    this.auth.updateProfile({ paymentMethods: this.methods.filter((m) => m.id !== id) });
  }
}

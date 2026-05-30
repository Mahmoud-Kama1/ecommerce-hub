import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-seller-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './seller-profile.html',
})
export class SellerProfile {
  private readonly fb = inject(FormBuilder);
  readonly auth = inject(AuthService);
  message = '';

  readonly form = this.fb.nonNullable.group({
    storeName: ['Demo Seller Store', Validators.required],
    description: ['Quality products at fair prices.'],
    payoutEmail: [this.auth.currentUser()?.email ?? '', Validators.email],
  });

  save(): void {
    this.message = 'Store profile saved (mock).';
  }
}

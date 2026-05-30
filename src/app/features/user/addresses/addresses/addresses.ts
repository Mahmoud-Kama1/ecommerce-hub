import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Address } from '../../../../core/models/user.model';

@Component({
  selector: 'app-addresses',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './addresses.html',
})
export class Addresses {
  private readonly fb = inject(FormBuilder);
  readonly auth = inject(AuthService);

  showForm = false;

  readonly form = this.fb.nonNullable.group({
    label: ['Home', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
    country: ['US', Validators.required],
  });

  get addresses(): Address[] {
    return this.auth.currentUser()?.addresses ?? [];
  }

  addAddress(): void {
    if (this.form.invalid) {
      return;
    }
    const user = this.auth.currentUser()!;
    const address: Address = { id: crypto.randomUUID(), ...this.form.getRawValue(), isDefault: this.addresses.length === 0 };
    this.auth.updateProfile({ addresses: [...this.addresses, address] });
    this.form.reset({ label: 'Home', country: 'US' });
    this.showForm = false;
  }

  removeAddress(id: string): void {
    this.auth.updateProfile({ addresses: this.addresses.filter((a) => a.id !== id) });
  }
}

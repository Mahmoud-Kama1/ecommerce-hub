import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
})
export class Profile {
  private readonly fb = inject(FormBuilder);
  readonly auth = inject(AuthService);

  message = '';

  readonly form = this.fb.nonNullable.group({
    firstName: [this.auth.currentUser()?.firstName ?? '', Validators.required],
    lastName: [this.auth.currentUser()?.lastName ?? '', Validators.required],
    phone: [this.auth.currentUser()?.phone ?? ''],
    email: [{ value: this.auth.currentUser()?.email ?? '', disabled: true }],
  });

  save(): void {
    if (this.form.invalid) {
      return;
    }
    const { firstName, lastName, phone } = this.form.getRawValue();
    this.auth.updateProfile({ firstName, lastName, phone });
    this.message = 'Profile updated successfully.';
  }
}

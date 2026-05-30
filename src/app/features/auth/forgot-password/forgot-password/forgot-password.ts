import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);

  message = '';
  error = '';
  submitting = false;

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.error = '';
    this.auth.resetPassword(this.form.getRawValue().email).subscribe({
      next: (res) => {
        this.message = res.message;
        this.submitting = false;
      },
      error: (err) => {
        this.error = err.message;
        this.submitting = false;
      },
    });
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-verify-email',
  imports: [RouterLink],
  templateUrl: './verify-email.html',
})
export class VerifyEmail {
  readonly auth = inject(AuthService);
  message = '';
  sending = false;

  resend(): void {
    this.sending = true;
    this.auth.sendVerificationEmail().subscribe(() => {
      this.message = 'Verification email sent. Check your inbox.';
      this.sending = false;
    });
  }

  verifyNow(): void {
    this.auth.verifyEmail().subscribe(() => {
      this.message = 'Email verified successfully!';
    });
  }
}

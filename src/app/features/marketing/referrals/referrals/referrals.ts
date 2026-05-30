import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.html',
})
export class Referrals {
  readonly auth = inject(AuthService);
  copied = false;

  get referralLink(): string {
    const id = this.auth.currentUser()?.id ?? 'guest';
    return `https://ecommerce-hub.com/ref/${id}`;
  }

  copyLink(): void {
    navigator.clipboard?.writeText(this.referralLink);
    this.copied = true;
  }
}

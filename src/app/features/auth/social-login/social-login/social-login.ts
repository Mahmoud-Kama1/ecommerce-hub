import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-login',
  template: `
    <div style="margin: 1.5rem 0">
      <button type="button" class="btn btn-secondary" (click)="loginWithGoogle()">
        Continue with Google
      </button>
    </div>
  `,
})
export class SocialLogin {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  loginWithGoogle(): void {
    this.auth.loginWithGoogle().subscribe(() => this.router.navigateByUrl('/'));
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../store/auth/auth.actions';
import { selectError, selectLoading } from '../../../../store/auth/auth.reducer';
import { AsyncPipe } from '@angular/common';
import { SocialLogin } from '../../social-login/social-login/social-login';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe, SocialLogin],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly loading$ = this.store.select(selectLoading);
  readonly error$ = this.store.select(selectError);

  readonly form = this.fb.nonNullable.group({
    email: ['demo@ecommerce-hub.com', [Validators.required, Validators.email]],
    password: ['demo123', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(AuthActions.login({ credentials: this.form.getRawValue() }));
  }
}

import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, of, switchMap, tap, take } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((err) => of(AuthActions.loginFailure({ error: err.message ?? 'Login failed' }))),
        ),
      ),
    ),
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ payload }) =>
        this.authService.register(payload).pipe(
          map((user) => AuthActions.registerSuccess({ user })),
          catchError((err) => of(AuthActions.loginFailure({ error: err.message ?? 'Registration failed' }))),
        ),
      ),
    ),
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          this.authService.currentUser.set(user);
          this.authService.isAuthenticated.set(true);
        }),
      ),
    { dispatch: false },
  );

  loginNavigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        switchMap(() =>
          this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            take(1),
            tap(() => this.router.navigateByUrl('/')),
          ),
        ),
      ),
    { dispatch: false },
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(({ user }) => {
          this.authService.currentUser.set(user);
          this.authService.isAuthenticated.set(true);
          this.router.navigateByUrl('/auth/verify-email');
        }),
      ),
    { dispatch: false },
  );

  restoreSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.restoreSession),
      switchMap(() => {
        const user = this.authService.restoreSession();
        return user ? of(AuthActions.loginSuccess({ user })) : EMPTY;
      }),
    ),
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigateByUrl('/auth/login');
        }),
      ),
    { dispatch: false },
  );
}

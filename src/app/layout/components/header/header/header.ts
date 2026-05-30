import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../../core/services/auth.service';
import { CartService } from '../../../../core/services/cart.service';
import { AuthActions } from '../../../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styles: `
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      border-bottom: 1px solid var(--border);
      background: var(--surface);
    }
    nav {
      display: flex;
      gap: 1.25rem;
      align-items: center;
      flex-wrap: wrap;
    }
    a {
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
    }
    a.active,
    a:hover {
      color: var(--primary);
    }
    .brand {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary);
    }
    .actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    .badge {
      background: var(--primary);
      color: white;
      border-radius: 999px;
      padding: 0.1rem 0.5rem;
      font-size: 0.75rem;
      margin-left: 0.25rem;
    }
    .user-name {
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    .btn-logout {
      background: none;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      padding: 0.375rem 0.75rem;
      font: inherit;
      cursor: pointer;
      color: var(--text);
    }
    .btn-logout:hover {
      border-color: var(--primary);
      color: var(--primary);
    }
  `,
})
export class Header {
  private readonly store = inject(Store);
  readonly auth = inject(AuthService);
  readonly cart = inject(CartService);

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}

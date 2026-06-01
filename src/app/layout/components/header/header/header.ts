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
      padding: 1.25rem 2rem;
      border-bottom: 1px solid var(--border);
      background: #0b0f19;
      position: sticky;
      top: 0;
      z-index: 1000;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      background: rgba(7, 10, 18, 0.85);
    }
    nav {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      flex-wrap: wrap;
    }
    a {
      color: var(--text-muted);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: all 0.2s ease;
    }
    a.active,
    a:hover {
      color: var(--text-bright);
    }
    a.active {
      color: var(--primary) !important;
      font-weight: 600;
    }
    .brand {
      font-family: 'Outfit', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: var(--text-bright);
      background: linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-decoration: none;
      transition: transform 0.2s ease;
    }
    .brand:hover {
      transform: scale(1.03);
    }
    .badge {
      background: var(--primary);
      color: white;
      border-radius: 999px;
      padding: 2px 8px;
      font-size: 0.75rem;
      margin-left: 4px;
      font-weight: bold;
    }
    .user-name {
      color: var(--text-muted);
      font-size: 0.875rem;
      background: rgba(255,255,255,0.03);
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid var(--border);
    }
    .btn-logout {
      background: transparent;
      border: 1px solid rgba(244, 63, 94, 0.3);
      color: var(--danger);
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-logout:hover {
      background: rgba(244, 63, 94, 0.1);
      border-color: var(--danger);
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

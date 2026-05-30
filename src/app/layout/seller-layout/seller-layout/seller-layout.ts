import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-seller-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './seller-layout.html',
  styles: `
    .seller-shell {
      display: grid;
      grid-template-columns: 220px 1fr;
      min-height: 100vh;
    }
    aside {
      background: #0f766e;
      color: white;
      padding: 1.5rem 1rem;
    }
    aside a {
      display: block;
      color: #ccfbf1;
      text-decoration: none;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      margin-bottom: 0.25rem;
    }
    aside a.active,
    aside a:hover {
      background: #115e59;
      color: white;
    }
    .content {
      padding: 2rem;
    }
  `,
})
export class SellerLayout {}

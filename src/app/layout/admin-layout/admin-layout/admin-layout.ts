import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styles: `
    .admin-shell {
      display: grid;
      grid-template-columns: 240px 1fr;
      min-height: 100vh;
    }
    aside {
      background: #1e293b;
      color: white;
      padding: 1.5rem 1rem;
    }
    aside a {
      display: block;
      color: #cbd5e1;
      text-decoration: none;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      margin-bottom: 0.25rem;
    }
    aside a.active,
    aside a:hover {
      background: #334155;
      color: white;
    }
    .content {
      padding: 2rem;
    }
  `,
})
export class AdminLayout {}

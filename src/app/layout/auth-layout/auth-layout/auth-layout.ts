import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.html',
  styles: `
    :host {
      display: grid;
      place-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #eef2ff, #f8fafc);
      padding: 2rem;
    }
    .card {
      width: 100%;
      max-width: 420px;
      background: white;
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }
  `,
})
export class AuthLayout {}

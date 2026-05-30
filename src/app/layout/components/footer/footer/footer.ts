import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styles: `
    footer {
      margin-top: auto;
      padding: 2rem;
      border-top: 1px solid var(--border);
      background: var(--surface);
      color: var(--text-muted);
      text-align: center;
    }
  `,
})
export class Footer {
  readonly year = new Date().getFullYear();
}

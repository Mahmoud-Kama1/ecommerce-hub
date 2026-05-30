import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  imports: [ReactiveFormsModule],
  templateUrl: './newsletter.html',
})
export class Newsletter {
  private readonly fb = inject(FormBuilder);
  subscribed = false;

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.subscribed = true;
  }
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOCK_CATEGORIES } from '../../../../core/data/mock-catalog';

@Component({
  selector: 'app-admin-categories',
  imports: [RouterLink],
  templateUrl: './admin-categories.html',
})
export class AdminCategories {
  readonly categories = MOCK_CATEGORIES;
}

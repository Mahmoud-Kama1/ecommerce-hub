import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.html',
})
export class AdminUsers {
  readonly auth = inject(AuthService);
  readonly users: User[] = this.auth.getAllUsers();

  toggleActive(user: User): void {
    this.auth.setUserActive(user.id, !user.isActive);
    user.isActive = !user.isActive;
  }
}

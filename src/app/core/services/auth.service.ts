import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { User, AuthCredentials, RegisterPayload } from '../models/user.model';

const STORAGE_USERS = 'ecommerce_registered_users';
const STORAGE_TOKEN = 'auth_token';
const STORAGE_USER_ID = 'auth_user_id';

const DEMO_USERS: User[] = [
  {
    id: 'user-1',
    email: 'demo@ecommerce-hub.com',
    phone: '+1234567890',
    firstName: 'Demo',
    lastName: 'User',
    role: 'customer',
    addresses: [
      {
        id: 'addr-1',
        label: 'Home',
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        postalCode: '62701',
        country: 'US',
        isDefault: true,
      },
    ],
    paymentMethods: [
      { id: 'pm-1', type: 'card', label: 'Visa ending 4242', last4: '4242', brand: 'Visa', isDefault: true },
    ],
    emailVerified: true,
    isActive: true,
    loyaltyPoints: 150,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'admin-1',
    email: 'admin@ecommerce-hub.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    addresses: [],
    paymentMethods: [],
    emailVerified: true,
    isActive: true,
    loyaltyPoints: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seller-1',
    email: 'seller@ecommerce-hub.com',
    firstName: 'Seller',
    lastName: 'User',
    role: 'seller',
    addresses: [],
    paymentMethods: [],
    emailVerified: true,
    isActive: true,
    loyaltyPoints: 0,
    createdAt: new Date().toISOString(),
  },
];

const DEMO_PASSWORDS: Record<string, string> = {
  'demo@ecommerce-hub.com': 'demo123',
  'admin@ecommerce-hub.com': 'admin123',
  'seller@ecommerce-hub.com': 'seller123',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<User | null>(null);
  readonly isAuthenticated = signal(false);

  login(credentials: AuthCredentials): Observable<User> {
    const email = credentials.email.toLowerCase();
    const demoPassword = DEMO_PASSWORDS[email];
    if (demoPassword && credentials.password === demoPassword) {
      const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email)!;
      this.setSession(user);
      return of(user).pipe(delay(400));
    }

    const registered = this.getRegisteredUsers().find((u) => u.email.toLowerCase() === email);
    if (registered && registered.password === credentials.password) {
      const { password: _, ...user } = registered;
      this.setSession(user);
      return of(user).pipe(delay(400));
    }

    return throwError(() => new Error('Invalid email or password'));
  }

  register(payload: RegisterPayload): Observable<User> {
    const email = payload.email.toLowerCase();
    if (DEMO_PASSWORDS[email] || this.getRegisteredUsers().some((u) => u.email.toLowerCase() === email)) {
      return throwError(() => new Error('An account with this email already exists'));
    }

    const user: User = {
      id: crypto.randomUUID(),
      email: payload.email,
      phone: payload.phone,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role ?? 'customer',
      addresses: [],
      paymentMethods: [],
      emailVerified: false,
      isActive: true,
      loyaltyPoints: 0,
      createdAt: new Date().toISOString(),
    };

    const stored = this.getRegisteredUsers();
    stored.push({ ...user, password: payload.password });
    localStorage.setItem(STORAGE_USERS, JSON.stringify(stored));

    return of(user).pipe(delay(400));
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER_ID);
  }

  sendVerificationEmail(): Observable<{ message: string }> {
    return of({ message: 'Verification email sent' }).pipe(delay(300));
  }

  verifyEmail(): Observable<User> {
    const user = this.currentUser();
    if (!user) {
      return throwError(() => new Error('Not authenticated'));
    }
    const updated = { ...user, emailVerified: true };
    this.updateStoredUser(updated);
    this.setSession(updated);
    return of(updated).pipe(delay(300));
  }

  resetPassword(email: string): Observable<{ message: string }> {
    const exists =
      DEMO_PASSWORDS[email.toLowerCase()] ||
      this.getRegisteredUsers().some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      return throwError(() => new Error('No account found with that email'));
    }
    return of({ message: 'Password reset link sent to your email' }).pipe(delay(400));
  }

  loginWithGoogle(): Observable<User> {
    const user = { ...DEMO_USERS[0], email: 'google.user@gmail.com', firstName: 'Google', lastName: 'User' };
    this.setSession(user);
    return of(user).pipe(delay(500));
  }

  restoreSession(): User | null {
    const token = localStorage.getItem(STORAGE_TOKEN);
    const userId = localStorage.getItem(STORAGE_USER_ID);
    if (!token || !userId) {
      return null;
    }

    const user =
      DEMO_USERS.find((u) => u.id === userId) ??
      this.getRegisteredUsers()
        .filter((u): u is User & { password: string } => u.id === userId)
        .map(({ password: _, ...u }) => u)[0];

    if (user) {
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      return user;
    }

    this.logout();
    return null;
  }

  updateProfile(updates: Partial<User>): User {
    const current = this.currentUser();
    if (!current) {
      throw new Error('Not authenticated');
    }
    const updated = { ...current, ...updates, id: current.id, role: current.role };
    this.updateStoredUser(updated);
    this.setSession(updated);
    return updated;
  }

  getAllUsers(): User[] {
    const registered = this.getRegisteredUsers().map(({ password: _, ...u }) => u);
    return [...DEMO_USERS, ...registered];
  }

  setUserActive(userId: string, isActive: boolean): void {
    const users = this.getRegisteredUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx >= 0) {
      users[idx] = { ...users[idx], isActive };
      localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
    }
    if (this.currentUser()?.id === userId) {
      this.setSession({ ...this.currentUser()!, isActive });
    }
  }

  private setSession(user: User): void {
    localStorage.setItem(STORAGE_TOKEN, 'mock-jwt-token');
    localStorage.setItem(STORAGE_USER_ID, user.id);
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  private updateStoredUser(user: User): void {
    const users = this.getRegisteredUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...user };
      localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
    }
    this.currentUser.set(user);
  }

  private getRegisteredUsers(): (User & { password: string })[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_USERS) ?? '[]');
    } catch {
      return [];
    }
  }
}

export type UserRole = 'customer' | 'seller' | 'admin';

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'wallet';
  label: string;
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  emailVerified: boolean;
  isActive: boolean;
  loyaltyPoints: number;
  createdAt: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthCredentials {
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
}

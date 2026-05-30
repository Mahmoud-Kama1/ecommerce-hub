import { UserRole } from '../models/user.model';

export const ROLES: Record<UserRole, UserRole> = {
  customer: 'customer',
  seller: 'seller',
  admin: 'admin',
};

export const ROLE_LABELS: Record<UserRole, string> = {
  customer: 'Customer',
  seller: 'Seller',
  admin: 'Admin',
};

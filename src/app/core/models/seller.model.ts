export interface SellerProfile {
  id: string;
  userId: string;
  storeName: string;
  description: string;
  logoUrl?: string;
  isApproved: boolean;
  totalEarnings: number;
  pendingPayout: number;
  createdAt: string;
}

export interface Payout {
  id: string;
  sellerId: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  requestedAt: string;
  paidAt?: string;
}

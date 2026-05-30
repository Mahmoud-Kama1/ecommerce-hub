export type PaymentMethodType = 'card' | 'paypal' | 'cod' | 'wallet';

export const PAYMENT_METHODS: { id: PaymentMethodType; label: string }[] = [
  { id: 'card', label: 'Credit / Debit Card' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'cod', label: 'Cash on Delivery' },
  { id: 'wallet', label: 'Wallet' },
];

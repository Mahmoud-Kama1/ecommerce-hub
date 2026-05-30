export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string;
  userId?: string;
  guestEmail?: string;
  sellerIds: string[];
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  statusHistory: OrderStatusHistory[];
  shippingAddress: string;
  paymentMethod: string;
  promoCode?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

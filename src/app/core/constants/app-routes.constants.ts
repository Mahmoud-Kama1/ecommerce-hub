export const APP_ROUTES = {
  home: '/',
  login: '/auth/login',
  register: '/auth/register',
  products: '/products',
  productDetail: (id: string) => `/products/${id}`,
  cart: '/cart',
  checkout: '/checkout',
  orders: '/orders',
  profile: '/profile',
  wishlist: '/wishlist',
  admin: '/admin',
  seller: '/seller',
} as const;

import { Routes } from '@angular/router';
import { authGuard, guestGuard, roleGuard } from './core/guards/auth.guard';
import { MainLayout } from './layout/main-layout/main-layout/main-layout';
import { AuthLayout } from './layout/auth-layout/auth-layout/auth-layout';
import { AdminLayout } from './layout/admin-layout/admin-layout/admin-layout';
import { SellerLayout } from './layout/seller-layout/seller-layout/seller-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', loadComponent: () => import('./features/home/home/home').then((m) => m.Home) },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/product-list/product-list/product-list').then((m) => m.ProductList),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./features/products/product-detail/product-detail/product-detail').then((m) => m.ProductDetail),
      },
      {
        path: 'categories/:slug',
        loadComponent: () =>
          import('./features/products/category-list/category-list/category-list').then((m) => m.CategoryList),
      },
      {
        path: 'search',
        loadComponent: () => import('./features/products/search/search/search').then((m) => m.Search),
      },
      { path: 'cart', loadComponent: () => import('./features/cart/cart/cart/cart').then((m) => m.Cart) },
      {
        path: 'checkout',
        loadComponent: () => import('./features/checkout/checkout/checkout/checkout').then((m) => m.Checkout),
      },
      {
        path: 'checkout/guest',
        loadComponent: () =>
          import('./features/checkout/guest-checkout/guest-checkout/guest-checkout').then((m) => m.GuestCheckout),
      },
      {
        path: 'orders',
        canActivate: [authGuard],
        loadComponent: () => import('./features/orders/order-list/order-list/order-list').then((m) => m.OrderList),
      },
      {
        path: 'orders/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/orders/order-detail/order-detail/order-detail').then((m) => m.OrderDetail),
      },
      {
        path: 'orders/:id/tracking',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/orders/order-tracking/order-tracking/order-tracking').then((m) => m.OrderTracking),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./features/user/profile/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'profile/addresses',
        canActivate: [authGuard],
        loadComponent: () => import('./features/user/addresses/addresses/addresses').then((m) => m.Addresses),
      },
      {
        path: 'profile/payment-methods',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/user/payment-methods/payment-methods/payment-methods').then((m) => m.PaymentMethods),
      },
      {
        path: 'wishlist',
        canActivate: [authGuard],
        loadComponent: () => import('./features/user/wishlist/wishlist/wishlist').then((m) => m.Wishlist),
      },
      {
        path: 'reviews',
        canActivate: [authGuard],
        loadComponent: () => import('./features/user/reviews/reviews/reviews').then((m) => m.Reviews),
      },
      {
        path: 'payments',
        canActivate: [authGuard],
        loadComponent: () => import('./features/payments/payment/payment/payment').then((m) => m.Payment),
      },
      {
        path: 'marketing/newsletter',
        loadComponent: () =>
          import('./features/marketing/newsletter/newsletter/newsletter').then((m) => m.Newsletter),
      },
      {
        path: 'marketing/loyalty',
        canActivate: [authGuard],
        loadComponent: () => import('./features/marketing/loyalty/loyalty/loyalty').then((m) => m.Loyalty),
      },
      {
        path: 'marketing/referrals',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/marketing/referrals/referrals/referrals').then((m) => m.Referrals),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayout,
    canActivate: [guestGuard],
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login/login').then((m) => m.Login) },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register/register').then((m) => m.Register),
      },
      {
        path: 'verify-email',
        loadComponent: () =>
          import('./features/auth/verify-email/verify-email/verify-email').then((m) => m.VerifyEmail),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/forgot-password/forgot-password/forgot-password').then((m) => m.ForgotPassword),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard, roleGuard(['admin'])],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/dashboard/admin-dashboard/admin-dashboard').then((m) => m.AdminDashboard),
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/users/admin-users/admin-users').then((m) => m.AdminUsers),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/admin/products/admin-products/admin-products').then((m) => m.AdminProducts),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/admin/categories/admin-categories/admin-categories').then((m) => m.AdminCategories),
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/admin/orders/admin-orders/admin-orders').then((m) => m.AdminOrders),
      },
      {
        path: 'discounts',
        loadComponent: () =>
          import('./features/admin/discounts/admin-discounts/admin-discounts').then((m) => m.AdminDiscounts),
      },
      {
        path: 'cms',
        loadComponent: () => import('./features/admin/cms/admin-cms/admin-cms').then((m) => m.AdminCms),
      },
    ],
  },
  {
    path: 'seller',
    component: SellerLayout,
    canActivate: [authGuard, roleGuard(['seller', 'admin'])],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/seller/dashboard/seller-dashboard/seller-dashboard').then((m) => m.SellerDashboard),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/seller/profile/seller-profile/seller-profile').then((m) => m.SellerProfile),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/seller/products/seller-products/seller-products').then((m) => m.SellerProducts),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/seller/orders/seller-orders/seller-orders').then((m) => m.SellerOrders),
      },
      {
        path: 'earnings',
        loadComponent: () =>
          import('./features/seller/earnings/seller-earnings/seller-earnings').then((m) => m.SellerEarnings),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

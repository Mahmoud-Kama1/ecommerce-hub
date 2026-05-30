# Ecommerce Hub

Multi-vendor Angular marketplace with customer, seller, and admin experiences. Frontend-first scaffold with mock data — ready for NestJS backend integration.

## Tech Stack

- **Angular 21** (standalone components, lazy routes)
- **NgRx** (auth & products state)
- **SCSS** global design tokens
- **Mock services** until NestJS API is connected

## Quick Start

```bash
cd C:\Users\HP\Projects\ecommerce-hub
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200)

### Demo Login

| Role | Email | Password |
|------|-------|----------|
| Customer | `demo@ecommerce-hub.com` | `demo123` |
| Admin | `admin@ecommerce-hub.com` | `admin123` |
| Seller | `seller@ecommerce-hub.com` | `seller123` |

### Demo Promo Codes

- `WELCOME10` — 10% off (min $50)
- `SAVE20` — $20 off (min $100)

## Project Structure

```
src/app/
├── core/           # Models, guards, interceptors, services, mock data
├── shared/         # Reusable UI components (product-card, rating-stars)
├── layout/         # Main, auth, admin, seller layouts
├── features/       # Feature pages (lazy-loaded)
│   ├── auth/       # Login, register, verify email, forgot password, Google OAuth
│   ├── user/       # Profile, addresses, payments, wishlist, orders, reviews
│   ├── products/   # List, detail, categories, search & filters
│   ├── cart/       # Cart with quantity & promo codes
│   ├── checkout/   # Checkout & guest checkout
│   ├── orders/     # Order list, detail, tracking
│   ├── payments/   # Payment gateway integration placeholder
│   ├── admin/      # Users, products, categories, orders, discounts, CMS
│   ├── seller/     # Dashboard, profile, products, orders, earnings
│   └── marketing/  # Newsletter, loyalty, referrals
└── store/          # NgRx auth & products slices
```

## Feature Map

| Module | Status | Notes |
|--------|--------|-------|
| User registration & login | Working (mock) | Email/password, Google OAuth stub, 3 demo roles |
| Email verification | Working (mock) | Resend + demo verify |
| Profile & roles | Working (mock) | Customer, Seller, Admin guards |
| Wishlist & favorites | Working (mock) | localStorage persistence |
| Product catalog | Working (mock) | Search, categories, price filter, stock filter |
| Shopping cart | Working (mock) | Add/remove, qty, promo codes, localStorage |
| Checkout | Working (mock) | Authenticated + guest checkout |
| Order management | Working (mock) | List, detail, tracking, admin ship |
| Payment gateways | Working (mock) | Card form placeholder |
| Admin panel | Working (mock) | Users, products, orders, discounts, CMS |
| Seller portal | Working (mock) | Dashboard, products, orders, earnings |
| Marketing & loyalty | Working (mock) | Newsletter, points, referrals |

## Backend Integration (NestJS)

When you add NestJS, point the API URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  apiUrl: 'http://localhost:3000/api',
  // payment & OAuth keys...
};
```

Replace mock services in `src/app/core/services/` with `ApiService` HTTP calls.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server |
| `npm run build` | Production build |
| `npm test` | Unit tests |

## Next Steps

1. Add NestJS backend with JWT auth and PostgreSQL/MongoDB
2. Implement real Stripe/PayPal/Razorpay in `features/payments`
3. Wire admin soft-delete and seller approval workflows
4. Add email service (Nodemailer/SendGrid) for verification & order notifications
5. Add i18n (`@angular/localize`) for multi-language support

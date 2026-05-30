import { authFeatureKey, authReducer } from './auth/auth.reducer';
import { productsFeatureKey, productsReducer } from './products/product.reducer';

export const appReducers = {
  [authFeatureKey]: authReducer,
  [productsFeatureKey]: productsReducer,
};

export { AuthEffects } from './auth/auth.effects';
export { ProductEffects } from './products/product.effects';

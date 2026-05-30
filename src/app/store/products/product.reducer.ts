import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../core/models/product.model';
import { ProductActions } from './product.actions';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,
    on(ProductActions.loadProducts, (state) => ({ ...state, loading: true, error: null })),
    on(ProductActions.loadProductsSuccess, (state, { products }) => ({
      ...state,
      products,
      loading: false,
    })),
    on(ProductActions.loadProductsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
});

export const {
  name: productsFeatureKey,
  reducer: productsReducer,
  selectProductsState,
  selectProducts,
  selectLoading: selectProductsLoading,
} = productsFeature;

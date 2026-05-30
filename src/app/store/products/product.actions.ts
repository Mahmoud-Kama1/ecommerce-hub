import { createActionGroup, props } from '@ngrx/store';
import { Product, ProductFilter } from '../../core/models/product.model';

export const ProductActions = createActionGroup({
  source: 'Products',
  events: {
    'Load Products': props<{ filter?: ProductFilter }>(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: string }>(),
  },
});

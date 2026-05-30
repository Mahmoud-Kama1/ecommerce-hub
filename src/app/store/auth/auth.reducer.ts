import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import { AuthActions } from './auth.actions';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
    on(AuthActions.loginSuccess, (state, { user }) => ({
      ...state,
      user,
      loading: false,
      error: null,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(AuthActions.register, (state) => ({ ...state, loading: true, error: null })),
    on(AuthActions.registerSuccess, (state, { user }) => ({
      ...state,
      user,
      loading: false,
    })),
    on(AuthActions.logout, () => initialState),
  ),
});

export const { name: authFeatureKey, reducer: authReducer, selectAuthState, selectUser, selectLoading, selectError } =
  authFeature;

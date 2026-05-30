import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, AuthCredentials, RegisterPayload } from '../../core/models/user.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ credentials: AuthCredentials }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    Register: props<{ payload: RegisterPayload }>(),
    'Register Success': props<{ user: User }>(),
    Logout: emptyProps(),
    'Restore Session': emptyProps(),
  },
});

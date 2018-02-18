import { AuthActions, AuthActionTypes } from './../actions/auth';
import { User } from '../models/user';

export interface State {
  loggedIn: boolean;
  loading: boolean;
  error: string;
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  loading: false,
  error: undefined,
  user: new User('', 'GUEST')
};

export function reducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AuthActionTypes.GET_USER:
      return {...state, loading: true};

    case AuthActionTypes.AUTHENTICATED:
      const user = {...action.payload};
      return {...state.user, user, loggedIn: true, loading: false};

    case AuthActionTypes.NOT_AUTHENTICATED:
      return {...state, ...initialState, loggedIn: false, loading: false};

    case AuthActionTypes.LOGIN:
      return {...state, loading: true};

    case AuthActionTypes.AUTH_ERROR:
      const error = {...action.payload};
      return {...state, error, loggedIn: false, loading: false};

    case AuthActionTypes.LOGOUT:
      return {...state, loggedIn: false, loading: true}

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;

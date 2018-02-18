import { createSelector, createFeatureSelector } from '@ngrx/store';
// import * as fromRoot from '../../reducers';
import * as fromAuth from './auth';

export interface AuthState {
  status: fromAuth.State;
}

export interface State {
  auth: AuthState;
}

export const authReducers = {
  status: fromAuth.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);
export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedIn
);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromAuth.getError
);
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromAuth.getLoading
);

export const selectRegisterState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

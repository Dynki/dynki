import { createSelector, createFeatureSelector } from '@ngrx/store';
// import * as fromRoot from '../../reducers';
import * as fromAuth from './auth';
import * as fromLoginPage from './login-page';
import * as fromRegister from './registration';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
  registration: fromRegister.State;
}

export interface State {
  auth: AuthState;
}

export const authReducers = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
  registration: fromRegister.reducer
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
  (state: AuthState) => state.loginPage
);
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);

export const selectRegisterState = createSelector(
  selectAuthState,
  (state: AuthState) => state.registration
);

export const getRegistrationCode = createSelector(
  selectRegisterState,
  fromRegister.getCode
);

export const getRegistrationError = createSelector(
  selectRegisterState,
  fromRegister.getError
);

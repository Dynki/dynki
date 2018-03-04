import { Action } from '@ngrx/store';
import { Credentials } from '../models/user';

export enum AuthActionTypes {
  GET_USER          = '[Auth] Get User',
  AUTHENTICATED     = '[Auth] Authenticated',
  NOT_AUTHENTICATED = '[Auth] Not Authenticated',
  VERIFICATION_EMAIL= '[Auth] Send Verification Email',
  NOT_VERIFIED      = '[Auth] Not Verified',
  LOGIN             = '[Auth] Login Attempt',
  LOGOUT            = '[Auth] Logout',
  FORGOT_PASSWORD   = '[Auth] Forgot Password',
  AUTH_ERROR        = '[Auth] Error',
  VERIFICATION_ERROR= '[Auth] Verification Error',
  SET_PERSISTENCE   = '[Auth] Set Persistence'
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GET_USER;
  constructor(public payload?: any) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: Credentials) {}
}

export class SetPersistence implements Action {
  readonly type = AuthActionTypes.SET_PERSISTENCE;
  constructor(public payload: Credentials) {}
}

export class Authenticated implements Action {
  readonly type = AuthActionTypes.AUTHENTICATED;
  constructor(public payload?: any) {}
}

export class NotAuthenticated implements Action {
  readonly type = AuthActionTypes.NOT_AUTHENTICATED;
  constructor(public payload?: any) {}
}

export class NotVerified implements Action {
  readonly type = AuthActionTypes.NOT_VERIFIED;
  constructor(public payload?: any) {}
}

export class ForgotPassword implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD;
  constructor(public payload?: any) {}
}

export class AuthError implements Action {
  readonly type = AuthActionTypes.AUTH_ERROR;
  constructor(public payload?: any) {}
}

export class VerificationError implements Action {
  readonly type = AuthActionTypes.VERIFICATION_ERROR;
  constructor(public payload?: any) {}
}

export class VerificationEmail implements Action {
  readonly type = AuthActionTypes.VERIFICATION_EMAIL;
  constructor(public payload?: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor(public payload?: any) {}
}

export type AuthActions =
  GetUser
  | Authenticated
  | NotAuthenticated
  | NotVerified
  | VerificationEmail
  | Login
  | Logout
  | ForgotPassword
  | AuthError
  | VerificationError
  | SetPersistence;

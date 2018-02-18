import { Action } from '@ngrx/store';
import { Credentials } from '../models/user';

export enum AuthActionTypes {
  GET_USER          = '[Auth] Get User',
  AUTHENTICATED     = '[Auth] Authenticated',
  NOT_AUTHENTICATED = '[Auth] Not Authenticated',
  LOGIN             = '[Auth] Login attempt',
  AUTH_ERROR        = '[Auth] Error',
  LOGOUT            = '[Auth] Logout'
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GET_USER;
  constructor(public payload?: any) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
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

export class AuthError implements Action {
  readonly type = AuthActionTypes.AUTH_ERROR;
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
  | Login
  | AuthError
  | Logout;

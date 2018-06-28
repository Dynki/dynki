import { Credentials } from './auth.model';

export enum AuthActionTypes {
  CHECK_SESSION     = '[Auth] Check Session',
  LOGIN             = '[Auth] Login Attempt',
  LOGIN_SUCCESS     = '[Auth] Login Success',
  LOGIN_FAILURE     = '[Auth] Login Failure',
  LOGIN_REDIRECT    = '[Auth] Login Redirect',
  LOGOUT            = '[Auth] Logout',
  LOGOUT_SUCCESS    = '[Auth] Logout Success',
  VERIFICATION_EMAIL= '[Auth] Send Verification Email',
  NOT_VERIFIED      = '[Auth] Not Verified',
  FORGOT_PASSWORD   = '[Auth] Forgot Password',
  AUTH_ERROR        = '[Auth] Error',
  VERIFICATION_ERROR= '[Auth] Verification Error',
  SET_PERSISTENCE   = '[Auth] Set Persistence',
  SIGN_UP           = '[Auth] Sign Up',
  REGISTER_REDIRECT = '[Auth] Register Redirect',
  REGISTER_ERROR    = '[Auth] Register Error'
}

export class CheckSession {
  static type = AuthActionTypes.CHECK_SESSION;
  constructor(public payload?: any) {}
}

export class LoginWithEmailAndPassword {
  static type = AuthActionTypes.LOGIN;
  constructor(public payload: Credentials) {}
}

export class SetPersistence {
  static type = AuthActionTypes.SET_PERSISTENCE;
  constructor(public payload: Credentials) {}
}

export class LoginSuccess {
  static type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload?: any) {}
}

export class LoginRedirect {
    static type = AuthActionTypes.LOGIN_REDIRECT;
    constructor(public payload?: any) {}
}

export class LoginFailure {
  static type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload?: any) {}
}

export class LogoutSuccess {
    static type = AuthActionTypes.LOGOUT_SUCCESS;
    constructor(public payload?: any) {}
}

export class NotVerified {
  static type = AuthActionTypes.NOT_VERIFIED;
  constructor(public payload?: any) {}
}

export class ForgotPassword {
  static type = AuthActionTypes.FORGOT_PASSWORD;
  constructor(public payload?: any) {}
}

export class AuthError {
  static type = AuthActionTypes.AUTH_ERROR;
  constructor(public payload?: any) {}
}

export class VerificationError {
  static type = AuthActionTypes.VERIFICATION_ERROR;
  constructor(public payload?: any) {}
}

export class VerificationEmail {
  static type = AuthActionTypes.VERIFICATION_EMAIL;
  constructor(public payload?: any) {}
}

export class Logout {
  static type = AuthActionTypes.LOGOUT;
  constructor(public payload?: any) {}
}

export class SignUp {
    static type = AuthActionTypes.SIGN_UP;
    constructor(public payload: Credentials) { }
}

export class RegisterError {
    static type = AuthActionTypes.REGISTER_ERROR;
    constructor(public payload: any) { }
}

export class RegisterRedirect {
    static type = AuthActionTypes.REGISTER_REDIRECT;
    constructor(public payload?: any) { }
}


export type AuthActions =
  CheckSession
  | LoginSuccess
  | LoginFailure
  | LoginWithEmailAndPassword
  | LoginRedirect
  | Logout
  | LogoutSuccess
  | NotVerified
  | VerificationEmail
  | ForgotPassword
  | AuthError
  | VerificationError
  | SetPersistence
  | SignUp
  | RegisterError
  | RegisterRedirect;


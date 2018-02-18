import { Action } from '@ngrx/store';
import { Credentials } from '../models/user';

export enum RegisterActionTypes {
    SIGN_UP          = '[Register] Sign Up',
    REDIRECT         = '[Register] Redirect',
    REGISTER_ERROR   = '[Register] Error'
}

export class SignUp implements Action {
    readonly type = RegisterActionTypes.SIGN_UP;
    constructor(public payload: Credentials) { }
}

export class RegisterError implements Action {
    readonly type = RegisterActionTypes.REGISTER_ERROR;
    constructor(public payload: any) { }
}

export class Redirect implements Action {
    readonly type = RegisterActionTypes.REDIRECT;
    constructor(public payload?: any) { }
}

export type RegisterActions =
    SignUp
    | Redirect
    | RegisterError;

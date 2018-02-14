import { Action } from '@ngrx/store';
import { Confirmation, Registration } from '../models/register';
import { User } from '../models/user';

export enum RegisterActionTypes {
    Register = '[Register] Sign Up',
    RegisterSuccess = '[Register] Success',
    RegisterFailure = '[Register] Failure',
    RegisterConfirmation = '[Register] Confirm'
}

export class RegisterConfirm implements Action {
    readonly type = RegisterActionTypes.RegisterConfirmation;

    constructor(public payload: Confirmation) { }
}

export class Register implements Action {
    readonly type = RegisterActionTypes.Register;

    constructor(public payload: Registration) { }
}

export class RegisterSuccess implements Action {
    readonly type = RegisterActionTypes.RegisterSuccess;

    constructor(public payload: { user: User }) { }
}

export class RegisterFailure implements Action {
    readonly type = RegisterActionTypes.RegisterFailure;

    constructor(public payload: any) { }
}

export type RegisterActions =
    Register
    | RegisterConfirm;

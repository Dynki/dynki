import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import { AuthService } from '../../services';
import {
    Register,
    RegisterConfirm,
    RegisterFailure,
    RegisterSuccess,
    RegisterActionTypes
} from '../actions/register';
import { Confirmation, Registration } from '../models/register';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class RegisterEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(RegisterActionTypes.Register),
    map((action: Register) => action.payload),
    exhaustMap((register: Registration) => this.authService
        .signUp(register)
        .pipe(
          map(user => new RegisterSuccess({ user: user })),
          catchError(error => {
            console.log(error);
            return of(new RegisterFailure(error))
          })
        ))
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(RegisterActionTypes.RegisterSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginError$ = this.actions$.pipe(
    ofType(RegisterActionTypes.RegisterFailure),
    map((action: RegisterFailure) => action.payload),
    tap((e) => this._notification.create('error', 'Registration Error',  e.message))
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private _notification: NzNotificationService
  ) {
    console.log('RegisterEffects::Constructor');
  }
}

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
    RegisterActionTypes,
    RegisterConfirmFailure,
    RegisterConfirmSuccess
} from '../actions/register';
import { Confirmation, Registration } from '../models/register';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class RegisterEffects {
  @Effect()
  register$ = this.actions$.pipe(
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

  @Effect()
  confirm$ = this.actions$.pipe(
    ofType(RegisterActionTypes.RegisterConfirmation),
    map((action: RegisterConfirm) => action.payload),
    exhaustMap((confirmation: Confirmation) => this.authService
        .confirmCode(confirmation.username, confirmation.code)
        .pipe(
          map(user => new RegisterConfirmSuccess(user)),
          catchError(error => {
            console.log(error);
            return of(new RegisterConfirmFailure(error))
          })
        ))
  );

  @Effect({ dispatch: false })
  registrationSuccess$ = this.actions$.pipe(
    ofType(RegisterActionTypes.RegisterSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  registrationError$ = this.actions$.pipe(
    ofType(RegisterActionTypes.RegisterFailure),
    map((action: RegisterFailure) => action.payload),
    tap((e) => this._notification.create('error', 'Registration Error',  e.message))
  );

  @Effect({ dispatch: false })
  registerRedirect$ = this.actions$.pipe(
    ofType(RegisterActionTypes.RegisterRedirect),
    tap(() => console.log('Action::RegisterRedirect::Effect')),
    tap(authed => {
      this.router.navigate(['/login/register']);
    }),
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

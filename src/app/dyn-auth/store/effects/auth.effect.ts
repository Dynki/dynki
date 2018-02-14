import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import { AuthService } from '../../services';
import {
  Login,
  LoginSuccess,
  LoginFailure,
  AuthActionTypes,
  LoginRedirect
} from '../actions/auth';
import { User, Authenticate } from '../models/user';
import { NzNotificationService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';

import * as fromAuth from '../reducers/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((auth: Authenticate) => this.authService
        .login(auth)
        .pipe(
          tap(() => console.log('Action::logged in::Effect', auth)),
          map(user => new LoginSuccess({ user: user })),
          catchError(error => {
            console.log(error);
            return of(new LoginFailure(error))
          })
        ))
  );

  @Effect()
  checkAuthStatus$ = this.actions$.pipe(
    ofType(AuthActionTypes.CheckAuthStatus),
    exhaustMap(() => this.authService
        .awsAuth.checkAuthStatus()
        .pipe(
          map(user => new LoginSuccess({ user: user })),
          catchError(error => {
            console.log(error);
            return of(new LoginRedirect())
          })
        ))
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => console.log('Action::LoginSuccess::Effect')),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect),
    tap(() => console.log('Action::LoginRedirect::Effect')),
    tap(authed => {
      this.router.navigate(['/login/auth']);
    }),
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap(() => console.log('Action::Logout::Effect')),
    tap(() => this.authService.logout()),
    tap(() => this.store.dispatch(new LoginRedirect()))
  );

  @Effect({ dispatch: false })
  loginError$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginFailure),
    map((action: LoginFailure) => action.payload),
    tap(() => console.log('Action::LoginFailure::Effect')),
    tap((e) => this._notification.create('error', 'Login error',  e.message))
  );


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private _notification: NzNotificationService,
    private store: Store<fromAuth.State>
  ) {
    console.log('AuthEffects::Constructor');
  }
}

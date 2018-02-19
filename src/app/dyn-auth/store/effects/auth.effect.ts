import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';
import { AngularFireAuth  } from 'angularfire2/auth';
import { NzNotificationService } from 'ng-zorro-antd';

import * as fromAuth from '../reducers/auth';
import * as authActions from '../actions/auth';
import { User, Credentials } from '../models/user';
import { switchMap } from 'rxjs/operator/switchMap';

@Injectable()
export class AuthEffects {
  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.GET_USER),
    map((action: authActions.GetUser) => action.payload),
    exhaustMap((payload) => this.afAuth.authState
        .pipe(
          map(authData => {
            if (authData && authData.emailVerified) {
              const user = new User(authData.uid, authData.displayName);
              return new authActions.Authenticated(user);
            } else {
              return new authActions.NotAuthenticated();
            }
          }),
          catchError(error => {
            console.log(error);
            return of(new authActions.AuthError(error))
          })
        ))
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.LOGIN),
    map((action: authActions.Login) => action.payload),
    exhaustMap((creds: Credentials) => {
        return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(creds.username, creds.password)
        .then((user) => {
          if (user.emailVerified) {
            return new authActions.Authenticated(new User(user.uid, user.displayName));
          } else {
            return new authActions.NotVerified();
          }
        })
        .catch((err) => new authActions.AuthError(err))
    }),
    catchError(err => of(new authActions.AuthError(err)))

  );

  @Effect()
  notVerified$ = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.NOT_VERIFIED),
    map((action: authActions.NotVerified) => action.payload),
    map((e) => new authActions.VerificationError({ message: 'Account not verified - please check your email'})),
    catchError(err => of(new authActions.AuthError(err)))
  );

  // @Effect()
  // checkAuthStatus$ = this.actions$.pipe(
  //   ofType(AuthActionTypes.CheckAuthStatus),
  //   exhaustMap(() => this.authService
  //       .awsAuth.checkAuthStatus()
  //       .pipe(
  //         map(user => new LoginSuccess({ user: user })),
  //         catchError(error => {
  //           console.log(error);
  //           return of(new LoginRedirect())
  //         })
  //       ))
  // );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.AUTHENTICATED),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.NOT_AUTHENTICATED),
    tap(authed => {
      this.router.navigate(['/login/auth']);
    }),
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.LOGOUT),
    tap(() => this.afAuth.auth.signOut()),
    tap(() => this.store.dispatch(new authActions.NotAuthenticated()))
  );

  @Effect({ dispatch: false })
  loginError$ = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.AUTH_ERROR),
    map((action: any) => action.payload),
    tap((e) => this._notification.create('error', 'Login error',  e.message))
  );

  @Effect({ dispatch: false })
  verificationError$ = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.VERIFICATION_ERROR),
    map((action: any) => action.payload),
    tap((e) => this._notification.create('error', 'Verification error',  e.message))
  );

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private router: Router,
    private _notification: NzNotificationService,
    private store: Store<fromAuth.State>
  ) {
    console.log('AuthEffects::Constructor');
  }
}

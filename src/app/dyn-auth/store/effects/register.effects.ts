import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';
import { AngularFireAuth  } from 'angularfire2/auth';

import * as registerActions from '../actions/register';
import * as authActions from '../actions/auth';
import { User, Credentials } from '../models/user';

@Injectable()
export class RegisterEffects {
  @Effect()
  register$ = this.actions$.pipe(
    ofType(registerActions.RegisterActionTypes.SIGN_UP),
    map((action: registerActions.SignUp) => action.payload),
    exhaustMap((creds: Credentials) =>
        Observable.fromPromise(
          <Promise<any>> this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(creds.username, creds.password)
        )
        .pipe(
          map(user => new authActions.Authenticated(new User(user.uid, user.displayName))),
          catchError(error => {
            console.log(error);
            return of(new registerActions.RegisterError(error))
          })
        ))
  );

  @Effect({ dispatch: false })
  registrationError$ = this.actions$.pipe(
    ofType(registerActions.RegisterActionTypes.REGISTER_ERROR),
    map((action: any) => action.payload),
    tap((e) => this._notification.create('error', 'Registration Error',  e.message))
  );

  @Effect({ dispatch: false })
  registerRedirect$ = this.actions$.pipe(
    ofType(registerActions.RegisterActionTypes.REDIRECT),
    tap(authed => {
      this.router.navigate(['/login/register']);
    }),
  );

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private router: Router,
    private _notification: NzNotificationService
  ) {
    console.log('RegisterEffects::Constructor');
  }
}

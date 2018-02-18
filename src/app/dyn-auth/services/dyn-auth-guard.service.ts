import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import { CanActivate,
  CanLoad,
  Router,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
 } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../store/reducers';
import * as Auth from '../store/actions/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new Auth.NotAuthenticated());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate();
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginRedirect } from './auth.actions';
import { AuthState } from './auth.state';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private store: Store) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.selectOnce(AuthState.getUser).pipe(
      map(u => {
        if (!u) {
          this.store.dispatch(new LoginRedirect());
        }
        return true;
      })
    );
  }
}

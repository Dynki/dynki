import { Component, OnInit } from '@angular/core';

import { AuthState } from '../../../dyn-auth/store/auth.state';
import { User } from '../../../dyn-auth/store/auth.model';
import { Select, Store, Actions, ofActionSuccessful, ofActionDispatched } from '@ngxs/store';
import { Observable } from 'rxjs/observable';

import * as menuActions from '../../../dyn-base/store/menu.actions';
import * as baseActions from '../../../dyn-base/store/base.actions';
import { BaseState } from 'app/dyn-base/store/base.state';
import { take } from 'rxjs/operators';

@Component({
    selector: 'dyn-post-auth',
    templateUrl: './dyn-post-auth.component.html',
})

export class PostAuthComponent implements OnInit {

  @Select(AuthState.getUser)
  public user$: Observable<User>;

  @Select(BaseState.domainId)
  public domainId$: Observable<string>;

  constructor(private store: Store, private action$: Actions) { }

  ngOnInit() {
    this.store.dispatch(new baseActions.GetUserDomain());

    // this.store.dispatch(new menuActions.InitMenus());

    this.action$.pipe(ofActionDispatched(baseActions.DomainLoaded))
    .subscribe(() => {
      console.log('Domain Loaded Fired');
      this.store.dispatch(new menuActions.InitMenus())
    });
  }
}

import { Component, OnInit } from '@angular/core';

import { AuthState } from '../../../dyn-auth/store/auth.state';
import { User } from '../../../dyn-auth/store/auth.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/observable';

import * as menuActions from '../../../dyn-base/store/menu.actions';

@Component({
    selector: 'dyn-post-auth',
    templateUrl: './dyn-post-auth.component.html',
})

export class PostAuthComponent implements OnInit {

  @Select(AuthState.getUser)
  public user$: Observable<User>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new menuActions.InitMenus());
  }
}

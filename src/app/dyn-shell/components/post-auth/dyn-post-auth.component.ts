import { Component } from '@angular/core';

import { AuthState } from '../../../dyn-auth/store/auth.state';
import { User } from '../../../dyn-auth/store/auth.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/observable';

@Component({
    selector: 'dyn-post-auth',
    templateUrl: './dyn-post-auth.component.html',
})

export class PostAuthComponent {

  @Select(AuthState.getUser)
  public user$: Observable<User>;

  _opened = false;
  isOn: false;

  constructor(private authStore: Store) { }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}

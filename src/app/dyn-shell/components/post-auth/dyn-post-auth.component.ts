import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromNav from '../../store/reducers';
import * as fromAuth from '../../../dyn-auth/store/reducers';

@Component({
    selector: 'dyn-post-auth',
    templateUrl: './dyn-post-auth.component.html',
})

export class PostAuthComponent {

  isCollapsed = this.navStore.pipe(select(fromNav.getExpanded));
  user$ = this.authStore.pipe(select(fromAuth.getUser));
  _opened = false;
  isOn: false;

  constructor(private navStore: Store<fromNav.State>, private authStore: Store<fromAuth.State>) { }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}

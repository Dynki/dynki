import { Component, Output } from '@angular/core';

import { Store, select} from '@ngrx/store';
import { TOGGLE_MENU } from '../../store/reducers/side-menu';
import * as fromNav from '../../store/reducers';
import * as Auth from '../../../dyn-auth/store/actions/auth';

@Component({
  selector: 'dyn-toolbar',
  templateUrl: './dyn-toolbar.component.html'
})

export class ToolbarComponent {

  isCollapsed = this.store.pipe(select(fromNav.getExpanded));

  constructor(private store: Store<fromNav.State>) { }

  logout(): void {
    this.store.dispatch(new Auth.Logout());
  }

  toggleMenu() {
    this.store.dispatch({ type: TOGGLE_MENU });
  }
}


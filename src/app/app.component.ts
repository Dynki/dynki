import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromNav from './dyn-shell/store/reducers';

@Component({
  selector: 'dyn-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'D';

  isCollapsed = this.store.pipe(select(fromNav.getExpanded));
  _opened = false;

  constructor(private store: Store<fromNav.State>) { }

  private _toggleSidebar() {

    console.log('click');

    if (this._opened === true) {
      this._opened = false;
    } else {
      this._opened = true;
    }

  }

}

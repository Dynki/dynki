import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromNav from '../../store/reducers';

@Component({
  selector: 'dyn-side-menu',
  templateUrl: './dyn-side-menu.component.html'
})

export class SideMenuComponent {

  isCollapsed = this.store.pipe(select(fromNav.getExpanded));

  constructor(private store: Store<fromNav.State>) { }
}

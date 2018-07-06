import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

import * as boardActions from '../../../dyn-boards/store/board.actions';

@Component({
  selector: 'dyn-side-menu',
  templateUrl: './dyn-side-menu.component.html'
})

export class SideMenuComponent {

  // isCollapsed = this.store.pipe(select(fromNav.getExpanded));

  constructor(private store: Store) { }

  chooseBoard() {
    console.log('Dispatch: Choose Board');
    this.store.dispatch(new boardActions.ChooseBoardType())
  }
}

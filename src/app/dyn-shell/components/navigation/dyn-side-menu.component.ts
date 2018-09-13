import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';

import * as boardActions from '../../../dyn-boards/store/board.actions';
import { DynMenu } from '../../../dyn-base/store/menu.model';
import { Observable } from 'rxjs/observable';
import { MenuState } from '../../../dyn-base/store/menu.state';

@Component({
  selector: 'dyn-side-menu',
  templateUrl: './dyn-side-menu.component.html'
})

export class SideMenuComponent {

  @Select(MenuState.getMenu('Main menu'))
  public menu$: Observable<DynMenu>;

  constructor(private store: Store) {
  }

  chooseBoard() {
    this.store.dispatch(new boardActions.ChooseBoardType());
  }
}

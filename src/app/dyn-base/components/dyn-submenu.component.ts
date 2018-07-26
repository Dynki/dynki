import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';

import { DynMenuItem } from '../store/menu.model';

@Component({
  selector: 'dyn-sub-menu',
  templateUrl: './dyn-submenu.component.html'
})
export class SubMenuComponent {
    @Input() subitem: DynMenuItem;
    buttonVisible: false;

    constructor(private store: Store) { }

    itemBtnClick(action: any) {
      this.store.dispatch(action);
    }

    itemClick(action: any) {
      if (action) {
        this.store.dispatch(action);
      }
    }
}

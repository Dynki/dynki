import { Component, Input } from '@angular/core';
import { DynMenuItem } from '../store/menu.model';
import { Store } from '@ngxs/store';

@Component({
  selector: 'dyn-sub-menu',
  templateUrl: './dyn-submenu.component.html'
})
export class DynSubMenuComponent {
    @Input() subitem: DynMenuItem;
    buttonVisible: false;

    constructor(private store: Store) {
      console.log('submenu::constructor', this.subitem);
    }

    itemClick(action: any) {
      this.store.dispatch(action);
    }
}

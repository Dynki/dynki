import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';

import { DynMenuItem } from '../store/menu.model';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import * as menuActions from '../store/menu.actions';

@Component({
  selector: 'dyn-sub-menu',
  templateUrl: './dyn-submenu.component.html'
})
export class SubMenuComponent {
    @Input() subitem: DynMenuItem;
    @Input() parentName: string;
    buttonVisible: boolean;
    subs = new Subscription();

    constructor(private store: Store) {
    }

    itemBtnClick(action: any) {
      this.store.dispatch(action);
    }

    itemClick(action: any) {
      if (action) {
        this.store.dispatch(action);
      }
    }

    private addClass(el: Element, name: string) {
      if (!el.classList.contains(name)) {
        el.classList.add(name);
      }
    }

    private removeClass(el: Element, name: string) {
      if (el.classList.contains(name)) {
        el.classList.remove(name);
      }
    }

    enterLeave(enter = false) {
      this.buttonVisible = enter ? true : false;

      this.store.dispatch(new menuActions.SetActiveMenu(this.subitem));
    }
}

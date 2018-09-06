import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';

import { DynMenuItem } from '../store/menu.model';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dyn-sub-menu',
  templateUrl: './dyn-submenu.component.html'
})
export class SubMenuComponent {
    @Input() subitem: DynMenuItem;
    @Input() parentName: string;
    buttonVisible: false;
    subs = new Subscription();

    constructor(private store: Store, private dragulaService: DragulaService) {
      this.subs.add(dragulaService.drag(this.parentName)
        .subscribe(({ el }) => {
          this.addClass(el, 'menu__item--dashed');
        })
      );
      this.subs.add(dragulaService.drop(this.parentName)
        .subscribe(({ el }) => {
          this.removeClass(el, 'menu__item--dashed');
        })
      );
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

}

import { Component, Input } from '@angular/core';
import { DynMenuItem } from '../store/menu.model';
import { Store } from '@ngxs/store';

@Component({
  selector: 'dyn-menu-item',
  templateUrl: './dyn-menu-item.component.html'
})
export class DynMenuItemComponent {
    @Input() menuitem: DynMenuItem;

    folderitem = {
      title: 'New Folder',
      icon: 'anticon anticon-folder-open'
    }

    constructor(private store: Store) {
      console.log('MenuItem::Constructor');
    }

    dispatchBtnAction(menuitem: DynMenuItem) {
      this.store.dispatch(menuitem.button.clickAction);
    }
}

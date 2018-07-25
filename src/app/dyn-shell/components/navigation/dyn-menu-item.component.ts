import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as menuActions from '../../store/menu.actions';

import { DynMenuItem } from '../../store/menu.model';

@Component({
  selector: 'dyn-menu-item',
  templateUrl: './dyn-menu-item.component.html'
})
export class MenuItemComponent implements OnInit {
    @Input() menuitem: DynMenuItem;

    folderitem: DynMenuItem;

    constructor(private store: Store) { }

    ngOnInit() {
      this.folderitem = {
        title: 'New Folder',
        icon: 'anticon anticon-folder-add',
        clickAction: new menuActions.NewMenuFolder(this.menuitem.title)
      }
   }

    dispatchBtnAction(menuitem: DynMenuItem) {
      this.store.dispatch(menuitem.button.clickAction);
    }
}

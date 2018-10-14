import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as menuActions from '../store/menu.actions';

import { DynMenuItem, MenuItem } from '../store/menu.model';
import * as boardActions from '../../dyn-boards/store/board.actions';

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
        id: null,
        parent: null,
        button: null,
        items: null,
        isFolder: true,
        isSelected: false,
        foldersAllowed: true,
        title: 'New Folder',
        icon: 'anticon anticon-folder-add',
        clickAction: new boardActions.AddFolder()
      }
    }

    dispatchBtnAction(menuitem: DynMenuItem) {
      this.store.dispatch(menuitem.button.clickAction);
    }

    updateMenu(items: MenuItem[]) {
      this.store.dispatch(new boardActions.UpdateBoards(items.map(i => ({ id: i.clickAction.boardId, title: i.title }))));
    }
}

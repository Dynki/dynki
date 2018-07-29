import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as menuActions from '../store/menu.actions';

import { DynMenuItem } from '../store/menu.model';

@Component({
  selector: 'dyn-folder-item',
  templateUrl: './dyn-folder-item.component.html'
})
export class FolderItemComponent implements OnInit {
    @Input() folderItem: DynMenuItem;
    editState = false;

    constructor(private store: Store) { }

    ngOnInit() {
    }

    editFolder(folder: DynMenuItem) {
        this.store.dispatch(new menuActions.UpdateFolder(folder));
        this.editState = false;
    }

    deleteFolder(folder: DynMenuItem) {
        this.store.dispatch(new menuActions.DeleteFolder(folder));
    }
}

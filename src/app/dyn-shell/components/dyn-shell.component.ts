import { Component, OnInit } from '@angular/core';

import * as Auth from '../../dyn-auth/store/auth.actions';
import * as boardActions from '../../dyn-boards/store/board.actions';
import * as menuActions from '../../dyn-base/store/menu.actions';

import { Store, Actions, ofActionSuccessful } from '@ngxs/store';

@Component({
  selector: 'dyn-shell',
  templateUrl: './dyn-shell.component.html',
  styleUrls: ['./dyn-shell.component.scss'],
})

export class ShellComponent implements OnInit {

  constructor(private store: Store, private action$: Actions) {}

  ngOnInit() {
    this.store.dispatch(new Auth.CheckSession());

    this.action$.pipe(ofActionSuccessful(menuActions.InitMenus))
      .subscribe(() => this.store.dispatch(new boardActions.GetAllBoards()));

    this.action$.pipe(ofActionSuccessful(boardActions.GetAllBoards))
      .subscribe(() => this.store.dispatch(new menuActions.LoadFolders('Main menu')));

    this.action$.pipe(ofActionSuccessful(boardActions.CreateBoard))
      .subscribe(() => this.store.dispatch(new menuActions.LoadFolders('Main menu')));
  }
}


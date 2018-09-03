import { Component, OnInit } from '@angular/core';
import { Store, Select, ofActionSuccessful, Actions, ofActionDispatched } from '@ngxs/store';

import * as boardActions from '../../../dyn-boards/store/board.actions';
import { DynMenu, DynMenuItem } from '../../../dyn-base/store/menu.model';
import { BoardState } from '../../../dyn-boards/store/board.state';
import { Observable } from 'rxjs/observable';
import { BoardStateModel } from '../../../dyn-boards/store/board.model';
import { MenuState } from '../../../dyn-base/store/menu.state';
import * as menuActions from '../../../dyn-base/store/menu.actions';
import { MenuBuilder } from '../../../dyn-base/services/dyn-menu.builder';

@Component({
  selector: 'dyn-side-menu',
  templateUrl: './dyn-side-menu.component.html'
})

export class SideMenuComponent implements OnInit {

  @Select(MenuState.getMenu('Main menu'))
  public menu$: Observable<DynMenu>;

  public menu: DynMenu;

  constructor(private store: Store, private action$: Actions, public mb: MenuBuilder) {
    this.menu$.subscribe(m => console.log(m));
    this.action$.pipe(
      ofActionDispatched(menuActions.LoadItems),
    ).subscribe(() => this.store.dispatch(new boardActions.GetAllBoards()));

    this.action$.pipe(
      ofActionSuccessful(boardActions.GetAllBoards),
    ).subscribe(() => this.store.dispatch(new menuActions.LoadFolders()));

    this.action$.pipe(
      ofActionSuccessful(boardActions.CreateBoard),
    ).subscribe(() => this.store.dispatch(new menuActions.LoadFolders()));
  }

  ngOnInit() {

    
    const newBoardBtn = {
      title: 'New Board',
      caption: '',
      icon: 'anticon anticon-plus',
      clickAction: new boardActions.ChooseBoardType()
    };

    const blankAddBtn = {
      title: '',
      caption: '',
      icon: 'anticon anticon-plus',
    };

    const items: DynMenuItem[] = [
      this.mb.setTitle('Inbox').setIcon('anticon anticon-mail').build(),
      this.mb.setTitle('Boards').setIcon('anticon anticon-dashboard').setButton(newBoardBtn).build(),
      this.mb.setTitle('Teams').setIcon('anticon anticon-appstore').setButton(blankAddBtn).build(),
      this.mb.setTitle('Projects').setIcon('anticon anticon-rocket').setButton(blankAddBtn).build(),
      this.mb.setTitle('Tags').setIcon('anticon anticon-tags').setButton(blankAddBtn).build()
    ]

    this.menu = {
      title: 'Main menu',
      items: items
    }
    this.store.dispatch(new menuActions.LoadItems(this.menu));
  }

  chooseBoard() {
    this.store.dispatch(new boardActions.ChooseBoardType());
  }

}

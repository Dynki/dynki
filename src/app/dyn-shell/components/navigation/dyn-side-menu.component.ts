import { Component, OnInit } from '@angular/core';
import { Store, Select, ofActionSuccessful, Actions, ofActionDispatched } from '@ngxs/store';

import * as boardActions from '../../../dyn-boards/store/board.actions';
import { DynMenu, DynMenuItem } from '../../../dyn-base/store/menu.model';
import { BoardState } from '../../../dyn-boards/store/board.state';
import { Observable } from 'rxjs/observable';
import { BoardStateModel } from '../../../dyn-boards/store/board.model';
import { MenuState } from '../../../dyn-base/store/menu.state';
import * as menuActions from '../../../dyn-base/store/menu.actions';

@Component({
  selector: 'dyn-side-menu',
  templateUrl: './dyn-side-menu.component.html'
})

export class SideMenuComponent implements OnInit {

  @Select(MenuState.getMenu('Main menu'))
  public menu$: Observable<DynMenu>;

  public menu: DynMenu;

  constructor(private store: Store, private action$: Actions) {
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

    this.menu = {
      title: 'Main menu',
      items: [{
        title: 'Inbox',
        icon: 'anticon anticon-mail'
      },
      {
        title: 'Boards',
        icon: 'anticon anticon-dashboard',
        button: {
          title: 'New Board',
          caption: '',
          icon: 'anticon anticon-plus',
          clickAction: new boardActions.ChooseBoardType()
        },
      },
      {
        title: 'Teams',
        icon: 'anticon anticon-appstore',
        button: {
          title: '',
          caption: '',
          icon: 'anticon anticon-plus',
        }
      },
      {
        title: 'Projects',
        icon: 'anticon anticon-rocket',
        button: {
          title: '',
          caption: '',
          icon: 'anticon anticon-plus',
        }
      },
      {
        title: 'tags',
        icon: 'anticon anticon-tags',
        button: {
          title: '',
          caption: '',
          icon: 'anticon anticon-plus',
        }
      }
    ]
    }

    this.store.dispatch(new menuActions.LoadItems(this.menu));
  }

  chooseBoard() {
    this.store.dispatch(new boardActions.ChooseBoardType());
  }

}

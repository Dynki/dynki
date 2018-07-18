import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';

import * as boardActions from '../../../dyn-boards/store/board.actions';
import { DynMenu, DynMenuItem, MenuStateModel } from '../../../dyn-boards/store/menu.model';
import { BoardState } from '../../../dyn-boards/store/board.state';
import { Observable } from 'rxjs/observable';
import { IBoard, BoardStateModel } from '../../../dyn-boards/store/board.model';
import { map } from 'rxjs/operators';
import { MenuState } from '../../../dyn-boards/store/menu.state';
import * as menuActions from '../../../dyn-boards/store/menu.actions';

@Component({
  selector: 'dyn-side-menu',
  templateUrl: './dyn-side-menu.component.html'
})

export class SideMenuComponent implements OnInit {

  @Select(BoardState)
  public boards$: Observable<BoardStateModel>;
  public boards: Array<DynMenuItem>;

  // isCollapsed = this.store.pipe(select(fromNav.getExpanded));
  @Select(MenuState.getMenu('Main menu'))
  public menu$: Observable<DynMenu>;

  public menu: DynMenu;

  constructor(private store: Store) {
    this.menu$.subscribe(m => console.log(m));
  }

  ngOnInit() {

    this.menu = {
      title: 'Main menu',
      items: [{
        title: 'Inbox',
        icon: 'anticon anticon-mail',
        expanded: false,
        button: undefined
      },
      {
        title: 'Boards',
        icon: 'anticon anticon-dashboard',
        expanded: false,
        button: {
          title: 'New Board',
          caption: '',
          icon: 'anticon anticon-plus',
          clickAction: new boardActions.ChooseBoardType()
        },
        submenu: []
        //   {
        //   title: 'New Folder',
        //   icon: 'anticon anticon-folder-open'
        // }]
      },
      {
        title: 'Teams',
        icon: 'anticon anticon-appstore',
        expanded: false,
        button: {
          title: '',
          caption: '',
          icon: 'anticon anticon-plus',
        },
        submenu: undefined
      },
      {
        title: 'Projects',
        icon: 'anticon anticon-rocket',
        expanded: false,
        button: {
          title: '',
          caption: '',
          icon: 'anticon anticon-plus',
        },
        submenu: undefined
      },
      {
        title: 'tags',
        icon: 'anticon anticon-tags',
        expanded: false,
        button: {
          title: '',
          caption: '',
          icon: 'anticon anticon-plus',
        },
        submenu: undefined
      }

    ]
    }

    this.store.dispatch(new menuActions.LoadItems(this.menu));
    this.store.dispatch(new boardActions.GetAllBoards());
  }

  chooseBoard() {
    this.store.dispatch(new boardActions.ChooseBoardType());
  }

}

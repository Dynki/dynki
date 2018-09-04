import { Component, Input, OnInit } from '@angular/core';

import { DynMenu } from '../store/menu.model';
import { Actions, ofActionDispatched, Store, ofActionSuccessful } from '../../../../node_modules/@ngxs/store';
import * as menuActions from '../../dyn-base/store/menu.actions';
import * as boardActions from '../../dyn-boards/store/board.actions';

@Component({
  selector: 'dyn-menu',
  templateUrl: './dyn-menu.component.html'
})
export class MenuComponent implements OnInit {
  @Input() menu: DynMenu;

  constructor(private store: Store, private action$: Actions) { }

  ngOnInit() {
  }
}

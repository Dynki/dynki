import { Component, Output, Input, OnInit } from '@angular/core';

import { Store, select} from '@ngrx/store';
import { TOGGLE_MENU } from '../../store/reducers/side-menu';
import * as fromNav from '../../store/reducers';
import * as Auth from '../../../dyn-auth/store/actions/auth';
import { IUser } from '../../../dyn-auth/store/models/user';

@Component({
  selector: 'dyn-toolbar',
  templateUrl: './dyn-toolbar.component.html'
})

export class ToolbarComponent implements OnInit {

  @Input() user: IUser;
  displayInitial: string;

  app = {
    title: 'Dynki'
  }
  // isCollapsed = this.store.pipe(select(fromNav.getExpanded));

  constructor(private store: Store<fromNav.State>) { }

  ngOnInit() {
    this.displayInitial = this.user.email.toLocaleUpperCase().slice(0, 1);
  }

  logout(): void {
    this.store.dispatch(new Auth.Logout());
  }

  // toggleMenu() {
  //   this.store.dispatch({ type: TOGGLE_MENU });
  // }
}


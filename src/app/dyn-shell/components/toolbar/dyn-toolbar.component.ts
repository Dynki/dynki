import { Component, Input, OnInit, ViewChild } from '@angular/core';

import * as Auth from '../../../dyn-auth/store/auth.actions';
import { User } from '../../../dyn-auth/store/auth.model';

import { MdcMenu, MdcMenuItem } from '@angular-mdc/web';
import { Store } from '@ngxs/store';

@Component({
  selector: 'dyn-toolbar',
  templateUrl: './dyn-toolbar.component.html'
})

export class ToolbarComponent implements OnInit {

  @ViewChild('demomenu') demoMenu: MdcMenu;
  @Input() user: User;
  displayInitial: string;

  app = {
    title: 'Dynki'
  }

  constructor(private store: Store) { }

  ngOnInit() {
    if (this.user) {
      this.displayInitial = this.user.email.toLocaleUpperCase().slice(0, 1);
    }
  }

  handleMenuSelect(event: { index: number, item: MdcMenuItem }) {
    // switch (event.index) {
    //   case 0:
    //     break;
    //   case 1:
    //     this.logout();
    //     break;
    //   default:
    //     break;
    // }
    this.logout();
  }

  logout(): void {
    this.store.dispatch(new Auth.Logout());
  }

  toggleMenu() {
    // this.store.dispatch({ type: TOGGLE_MENU });
  }
}


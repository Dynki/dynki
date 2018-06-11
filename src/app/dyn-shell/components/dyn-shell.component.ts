import { Component, OnInit } from '@angular/core';

import * as fromAuth from '../../dyn-auth/store/reducers';
import * as Auth from '../../dyn-auth/store/actions/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'dyn-shell',
  templateUrl: './dyn-shell.component.html',
  styleUrls: ['./dyn-shell.component.scss'],
})

export class ShellComponent implements OnInit {

  _opened = false;

  constructor(private store: Store<fromAuth.State>) { }

 ngOnInit() {
  this.store.dispatch(new Auth.GetUser());
 }

 private _toggleSidebar() {
    console.log('click');

    if (this._opened === true) {
      this._opened = false;
    } else {
      this._opened = true;
    }

  }

}

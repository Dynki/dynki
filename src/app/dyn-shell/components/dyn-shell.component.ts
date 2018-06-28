import { Component, OnInit } from '@angular/core';

// import * as fromAuth from '../../dyn-auth/store/reducers';
import * as Auth from '../../dyn-auth/store/auth.actions';
import { Store } from '@ngxs/store';
// import { Store } from '@ngrx/store';

@Component({
  selector: 'dyn-shell',
  templateUrl: './dyn-shell.component.html',
  styleUrls: ['./dyn-shell.component.scss'],
})

export class ShellComponent implements OnInit {

  _opened = false;

  constructor(private store: Store) { }

 ngOnInit() {
  this.store.dispatch(new Auth.CheckSession());
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

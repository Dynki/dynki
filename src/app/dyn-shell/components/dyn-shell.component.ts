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

  constructor(private store: Store<fromAuth.State>) { }

 ngOnInit() {
  this.store.dispatch(new Auth.GetUser());
 }

}

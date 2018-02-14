import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../../store/reducers';
import * as Auth from '../../store/actions/auth';

@Component({
  selector: 'dyn-login',
  templateUrl: './dyn-login.component.html'
})
export class LoginComponent {
  form = new FormGroup({ username: new FormControl(''), password: new FormControl('') });
  pending = this.store.pipe(select(fromAuth.getLoginPagePending));

  constructor (private store: Store<fromAuth.State>) { }

  submit() {
    this.store.dispatch(new Auth.Login(this.form.value));
  }
  register() {
    this.store.dispatch(new Auth.Login(this.form.value));
  }
  forgot() {
    this.store.dispatch(new Auth.Login(this.form.value));
  }
}

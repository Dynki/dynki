import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../../store/reducers';
import * as Auth from '../../store/actions/auth';
import * as Registration from '../../store/actions/register';

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
    console.log('Register Clicked');
    this.store.dispatch(new Registration.RegisterRedirect());
  }
  forgot() {
    this.store.dispatch(new Auth.Login(this.form.value));
  }
}

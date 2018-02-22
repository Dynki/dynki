import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select, Action } from '@ngrx/store';

import * as fromAuth from '../../store/reducers';
import * as authActions from '../../store/actions/auth';
import * as registerActions from '../../store/actions/register';

@Component({
  selector: 'dyn-login',
  templateUrl: './dyn-login.component.html'
})
export class LoginComponent {
  form = new FormGroup({ username: new FormControl(''), password: new FormControl(''), persistence: new FormControl(true) });
  pending = this.store.pipe(select(fromAuth.getLoginPagePending));
  user = this.store.pipe(select(fromAuth.getUser));
  verificationError = this.store.pipe(select(fromAuth.getVerificationError));

  constructor (private store: Store<fromAuth.State>) { }

  submit() {
    this.store.dispatch(new authActions.Login(
      {...this.form.value, persistence: (this.form.value.persistence ? 'local' : 'session') }
    ));
  }

  register() {
    this.store.dispatch(new registerActions.Redirect());
  }

  forgot() {
    this.process(new authActions.ForgotPassword(this.form.value.username));
  }

  resendEmail() {
    this.process(new authActions.VerificationEmail(this.user));
  }

  process(action: Action) {
    if (this.form.controls.username.invalid) {
      this.store.dispatch(new authActions.AuthError({ message: 'Please enter a valid email'}));
    } else {
      this.store.dispatch(action);
    }
  }
}

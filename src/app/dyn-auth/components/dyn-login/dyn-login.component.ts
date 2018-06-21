import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store, select, Action } from '@ngrx/store';

import * as fromAuth from '../../store/reducers';
import * as authActions from '../../store/actions/auth';
import * as registerActions from '../../store/actions/register';
import { MdcTextField } from '@angular-mdc/web';

@Component({
  selector: 'dyn-login',
  templateUrl: './dyn-login.component.html'
})
export class LoginComponent implements OnInit {
  // form = new FormGroup({ username: new FormControl(''), password: new FormControl(''), persistence: new FormControl(true) });
  validateForm: FormGroup;
  pending = this.store.pipe(select(fromAuth.getLoginPagePending));
  user = this.store.pipe(select(fromAuth.getUser));
  verificationError = this.store.pipe(select(fromAuth.getVerificationError));

  constructor(private store: Store<fromAuth.State>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  submit() {
    this.store.dispatch(new authActions.SetPersistence(
      { ...this.validateForm.value, persistence: (this.validateForm.value.remember ? 'local' : 'session') }
    ));
  }

  register() {
    this.store.dispatch(new registerActions.Redirect());
  }

  forgot() {
    this.process(new authActions.ForgotPassword(this.validateForm.value.username));
  }

  resendEmail() {
    // this.process(new authActions.VerificationEmail(this.user));
  }

  process(action: Action) {
    if (this.validateForm.controls.username.invalid) {
      this.store.dispatch(new authActions.AuthError({ message: 'Please enter a valid email' }));
    } else {
      this.store.dispatch(action);
    }
  }
}

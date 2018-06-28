import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { AuthState } from '../../store/auth.state';
import * as authActions from '../../store/auth.actions';
import { User } from 'app/dyn-auth/store/auth.model';

@Component({
  selector: 'dyn-login',
  templateUrl: './dyn-login.component.html'
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  @Select(AuthState.getPending)
  public pending$: Observable<boolean>;

  @Select(AuthState.getUser)
  public user$: Observable<User>

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submit() {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.store.dispatch(new authActions.SetPersistence(
        { ...this.validateForm.value, persistence: (this.validateForm.value.remember ? 'local' : 'session') }
      ));
    }
  }

  register() {
    this.store.dispatch(new authActions.RegisterRedirect);
  }

  forgot() {
    this.process(new authActions.ForgotPassword(this.validateForm.value.username));
  }

  resendEmail() {
    this.process(new authActions.VerificationEmail(this.user$));
  }

  process(action: any) {
    if (this.validateForm.controls.username.invalid) {
      this.store.dispatch(new authActions.AuthError({ message: 'Please enter a valid email' }));
    } else {
      this.store.dispatch(action);
    }
  }
}

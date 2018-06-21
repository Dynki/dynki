import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../../store/reducers';
import * as authActions from '../../store/actions/auth';
import * as registerActions from '../../store/actions/register';

@Component({
  selector: 'dyn-signup',
  templateUrl: './dyn-signup.component.html'
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  pending = this.store.pipe(select(fromAuth.getLoginPagePending));

  constructor (private store: Store<fromAuth.State>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submit() {
    this.store.dispatch(new registerActions.SignUp(this.form.value));
  }

  goToLogin() {
    this.store.dispatch(new authActions.NotAuthenticated());
  }
}

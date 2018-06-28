import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import * as authActions from '../../store/auth.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'dyn-signup',
  templateUrl: './dyn-signup.component.html'
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  // pending = this.store.pipe(select(fromAuth.getLoginPagePending));

  constructor (private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submit() {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[ i ].markAsDirty();
      this.form.controls[ i ].updateValueAndValidity();
    }

    if (this.form.valid) {
      this.store.dispatch(new authActions.SignUp(this.form.value));
    }
  }

  goToLogin() {
    this.store.dispatch(new authActions.LoginRedirect());
  }
}

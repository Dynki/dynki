import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import * as authActions from '../../store/auth.actions';
import { Store, Select } from '@ngxs/store';
import { AuthState } from 'app/dyn-auth/store/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'dyn-signup',
  templateUrl: './dyn-signup.component.html'
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  @Select(AuthState.getPending)
  public pending$: Observable<boolean>;

  constructor (private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required,
        // tslint:disable-next-line
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      password: [null, [Validators.required]],
      agree: [null, [Validators.required]]
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

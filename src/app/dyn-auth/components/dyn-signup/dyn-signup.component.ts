import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../../store/reducers';
import * as Registration from '../../store/actions/register';

@Component({
  selector: 'dyn-signup',
  templateUrl: './dyn-signup.component.html'
})
export class SignupComponent {
  form = new FormGroup({ username: new FormControl(''), password: new FormControl('') });
  pending = this.store.pipe(select(fromAuth.getLoginPagePending));

  constructor (private store: Store<fromAuth.State>) { }

  submit() {
    this.store.dispatch(new Registration.Register(this.form.value));
  }
}

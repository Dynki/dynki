import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Register from '../../store/actions/register';
import * as fromAuth from '../../store/reducers';

@Component({
  selector: 'dyn-confirm',
  templateUrl: './dyn-confirm.component.html'
})
export class ConfirmComponent {
  code: string;
  form: FormGroup;

  constructor (
    private fb: FormBuilder,
    private store: Store<fromAuth.State>
  ) { }

  confirmCode() {
    this.store.dispatch(new Register.RegisterConfirm(this.form.value));
  }
}

import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import * as Register from '../../store/actions/register';
import * as fromAuth from '../../store/reducers';

@Component({
  selector: 'dyn-confirm',
  templateUrl: './dyn-confirm.component.html'
})
export class ConfirmComponent {
  form = new FormGroup({ code: new FormControl('') });

  constructor (private store: Store<fromAuth.State>) { }

  submit() {
    this.store.dispatch(new Register.RegisterConfirm(this.form.value));
  }
}

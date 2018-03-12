import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TimeEntry } from '../store/models/timer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'dyn-timer',
  templateUrl: './dyn-timer.component.html'
})
export class TimerComponent {
  form = new FormGroup({ description: new FormControl('') });

  get timerLabel(): string {
    return 'Start';
  }

  // constructor (private store: Store<fromAuth.State>) { }

  start() {
    // this.store.dispatch(new timerActions.StartTimer());
  }

  stop() {
    // this.store.dispatch(new timerActions.StopTimer());
  }
}

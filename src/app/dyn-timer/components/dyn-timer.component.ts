import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TimeEntry } from '../store/models/timer';
import { Store, select } from '@ngrx/store';
import * as fromTimer from '../store/reducers'
import * as timerActions from '../store/actions/timer.actions';
import { Observable } from 'rxjs/Observable';
import { takeWhile, tap, filter, switchMap, mapTo } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'dyn-timer',
  templateUrl: './dyn-timer.component.html'
})
export class TimerComponent {

  form = new FormGroup({ description: new FormControl('')});
  running = false;
  duration$: Observable<string>;
  duration = '-- -- --';

  running$ = this.store.pipe(
    select(fromTimer.getStopWatchRunningState),
    tap(runVal => this.running = runVal)
  );

  log$ = this.store.pipe(
    select(fromTimer.getStopWatchCurrentLog),
    filter(logData => (logData) ? true : false),
  );

  get timerLabel(): string {
    return this.running ? 'Stop' : 'Start';
  }

  constructor (private store: Store<fromTimer.TimerState>) {
    this.duration$ = this.log$
    .pipe(
      switchMap(logData => logData.duration$)
    )
      // tap(logData => console.log(logData)),
      // tap(logData => this.form.patchValue({ description: logData.description })),
      // tap(logData => {
      //   this.duration$.pipe(
      //     // takeWhile(() => this.running)
      //   ).subscribe(() => this.duration = logData.formattedDuration);
      // })

    this.running$.subscribe(runValue => {
      this.running = runValue;
    });
  }

  toggle() {
    this.running ? this.stop() : this.start();
  }

  start() {
    this.duration$.pipe(
      takeWhile(() => this.running)
    ).subscribe(duration => this.duration = duration);
    this.store.dispatch(new timerActions.StartTimer());
  }

  stop() {
    this.store.dispatch(new timerActions.StopTimer());
  }
}

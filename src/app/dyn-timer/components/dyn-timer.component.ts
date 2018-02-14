import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { duration } from 'moment';
import { TimerService } from '../services/dyn-timer.service';
import { TimeEntry } from '../store/models/timer';

@Component({
  selector: 'dyn-timer',
  templateUrl: './dyn-timer.component.html'
})
export class TimerComponent implements OnInit {
  private timerForm: FormGroup;
  private timeEntry: TimeEntry
  private running = false;
  private timerLabel = 'Start';

  constructor (
    public router: Router,
    private fb: FormBuilder,
    private timerService: TimerService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.timerForm = this.fb.group({
      description: '',
      started: null,
      duration: null
    });
  }

  toggle() {
      if (this.running) {
        this.running = false;
        this.timerLabel = 'Start';
        this.stop();
      } else {
        this.running = true;
        this.timerLabel = 'Stop';
        this.start();
      }
  }

  start() {
      this.timerService
      .createTimeEntry(new Date(), this.timerForm.value.description)
      .subscribe((newEntry) => {
        this.timeEntry = newEntry;
      });
  }

  stop() {
      this.timerService.updateTimeEntry(this.timeEntry);
  }
}

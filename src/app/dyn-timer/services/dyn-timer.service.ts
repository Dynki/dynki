import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { TimeEntry } from '../store/models/timer';
import { LambdaUtil } from 'app/shared/aws/labmda.util';
import { Utils } from 'app/shared/utils';

declare var AWS;

@Injectable()
export class TimerService {

  constructor(
    private lambdaUtil: LambdaUtil,
  ) { }

  // public createTimeEntry(started: Date, descripton: string = ''): Observable<TimeEntry> {

  //   const entry: TimeEntry = {
  //     _id: undefined,
  //     started: started,
  //     stopped: undefined,
  //     description: descripton,
  //     duration: undefined,
  //     projects: [],
  //     tags: [],
  //     user: '',
  //     createdBy: '',
  //     createdDate: new Date(),
  //     modifiedBy: '',
  //     modifiedDate: new Date()
  //   }

  //   return Observable.fromPromise(this.lambdaUtil.constructLambda('post', 'timeEntries', entry));
  // }

  // public getTimeEntry(entry: TimeEntry): Observable<TimeEntry> {
  //   const payload = entry;

  //   return Observable.fromPromise(this.lambdaUtil.constructLambda('get', `timeEntries/${entry._id}`, payload));
  // }

  // public getTimeEntries(date: Date): Observable<TimeEntry[]> {
  //   const payload = {
  //     user: '',
  //     start: date
  //   };

  //   return Observable.fromPromise(this.lambdaUtil.constructLambda('get', 'timeEntries', payload));
  // }

  // public updateTimeEntry(entry: TimeEntry): Observable<TimeEntry> {
  //   const payload = entry;

  //   return Observable.fromPromise(this.lambdaUtil.constructLambda('put', `timeEntries/${entry._id}`, payload));
  // }

  // public deleteTimeEntry(entryId: string): Observable<TimeEntry> {
  //   const payload = {
  //     _id: entryId
  //   };

  //   return Observable.fromPromise(this.lambdaUtil.constructLambda('delete', `timeEntries/${entryId}`, payload));
  // }
}

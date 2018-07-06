// import * as moment from 'moment';
// import { Observable, interval } from 'rxjs';
// import { map } from 'rxjs/operators';
// import * as pluralize from 'pluralize';


// export interface ITimeLog extends BaseClass {
//     id: string;
//     description: string;
//     entries: Array<ITimeEntry>
//     duration$: Observable<string>;
//     projects: Array<string>;
//     tags: Array<string>;
// }

// export interface ITimeEntry {
//     id: string;
//     started: moment.Moment;
//     stopped: moment.Moment;
//     duration: number;
// }

// export class TimeEntry implements ITimeEntry {
//     id: null;
//     started: moment.Moment;
//     stopped: moment.Moment;

//     constructor() {
//         this.started = moment();
//         this.stopped = null;
//     }

//     stop() {
//         this.stopped = moment();
//     }

//     get duration(): number {
//         return this.stopped ?
//             moment.duration(this.stopped.diff(this.started)).as('milliseconds') :
//             moment.duration(moment().diff(this.started)).as('milliseconds')
//     }
// }

// export interface ITimer {
//     details: ITimeLog;
//     running: boolean;
// };

// export class TimeLog implements ITimeLog {
//     id: string;
//     description = '';
//     entries: Array<ITimeEntry>;
//     projects: string[];
//     tags: string[];
//     user: string;
//     createdBy: string;
//     createdDate: Date;
//     modifiedBy: string;
//     modifiedDate: Date;

//     constructor() {
//         this.entries = [];
//         this.entries.push(new TimeEntry());
//     }

//     get duration$(): Observable<string> {
//         return interval(1000)
//         .pipe(
//             map(() => {
//                 const dur = moment.duration(this.entries.reduce((sum, n) => sum + n.duration, 0));
//                 const durationArr = [{ label: pluralize('day', dur.days()), value: dur.days() },
//                     { label: 'h', value: dur.hours() },
//                     { label: 'm', value: dur.minutes() },
//                     { label: 's', value: dur.seconds() }];

//                 return durationArr
//                     .map(x => x.value + ' ' + x.label + ' ')
//                     .reduce((sum, v) => sum + v, '');
//             })
//         );
//     }
// }

// export interface StopWatch {
//     running: true;
//     logId: number;
// }

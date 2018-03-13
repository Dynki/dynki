import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { switchMap, mapTo, map } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import * as _ from 'lodash';
import * as pluralize from 'pluralize';
import { of } from 'rxjs/observable/of';

export class BaseClass {
    user: string;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
}

export interface ITimeLog extends BaseClass {
    id: string;
    description: string;
    entries: Array<ITimeEntry>
    duration$: Observable<string>;
    projects: Array<string>;
    tags: Array<string>;
}

export interface ITimeEntry {
    id: string;
    started: moment.Moment;
    stopped: moment.Moment;
    duration: number;
}

export class TimeEntry implements ITimeEntry {
    id: null;
    started: moment.Moment;
    stopped: moment.Moment;

    constructor() {
        this.started = moment();
        this.stopped = null;
    }

    stop() {
        this.stopped = moment();
    }

    get duration(): number {
        return this.stopped ?
            moment.duration(this.stopped.diff(this.started)).as('milliseconds') :
            moment.duration(moment().diff(this.started)).as('milliseconds')
    }
}

export interface ITimer {
    details: ITimeLog;
    running: boolean;
};

export class TimeLog implements ITimeLog {
    id: string;
    description = '';
    entries: Array<ITimeEntry>;
    projects: string[];
    tags: string[];
    user: string;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;

    constructor() {
        this.entries = [];
        this.entries.push(new TimeEntry());
    }

    get duration$(): Observable<string> {
        return interval(1000)
        .pipe(
            map(() => {
                const dur = moment.duration(this.entries.reduce((sum, n) => sum + n.duration, 0));
                const durationArr = [{ label: 'month', value: dur.months() },
                    { label: 'day', value: dur.days() },
                    { label: 'hour', value: dur.hours() },
                    { label: 'min', value: dur.minutes() },
                    { label: 'sec', value: dur.seconds() }];

                return durationArr.filter((n) => n.value > 0)
                .map(x => x.value + ' ' + pluralize(x.label, x.value) + ' ')
                .reduce((sum, v) => sum + v, '');
            })
        );
    }
}

export interface StopWatch {
    running: true;
    logId: number;
}

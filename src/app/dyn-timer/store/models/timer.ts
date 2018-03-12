import * as moment from 'moment';

export class BaseClass {
    user: string;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
}

export interface ITimeEntry extends BaseClass {
    id: string;
    description: string;
    started: moment.Moment;
    stopped: moment.Moment;
    duration: number;
    formattedDuration: string;
    projects: Array<string>;
    tags: Array<string>;
}

export interface ITimer {
    details: ITimeEntry;
    running: boolean;
};

export class TimeEntry implements ITimeEntry {
    id: string;
    description = '';
    started: moment.Moment;
    stopped: moment.Moment;
    projects: string[];
    tags: string[];
    user: string;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;

    constructor() {
        this.started = moment();
    }

    get formattedDuration(): string {
        const endTime = moment();
        const mins = moment.utc(moment(endTime, 'HH:mm:ss').diff(moment(this.started, 'HH:mm:ss'))).format('mm')
        const seconds = moment.utc(moment(endTime, 'HH:mm:ss').diff(moment(this.started, 'HH:mm:ss'))).format('ss')
        return endTime.diff(this.started, 'hours') + ' Hrs, ' + mins + ' Mins';
    }

    get duration(): number {
        return moment().diff(this.started, 'milliseconds');
    }
}

export interface StopWatch {
    running: true;
    logId: number;
}

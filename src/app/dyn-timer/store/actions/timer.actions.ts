import { Action } from '@ngrx/store';
import { TimeEntry } from '../models/timer';

export enum TimerActionTypes {
  START_TIMER       = '[Timer] Start',
  STOP_TIMER        = '[Timer] Stop'
};

export class StartTimer implements Action {
    readonly type = TimerActionTypes.START_TIMER;
    constructor(public payload?: any) {}
}

export class StopTimer implements Action {
    readonly type = TimerActionTypes.STOP_TIMER;
    constructor(public payload?: any) {}
}

export type TimerActions =
    StartTimer
    | StopTimer;

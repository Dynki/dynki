import { TimerActions, TimerActionTypes } from './../actions/timer.actions';
import { TimeEntry, TimeLog, } from '../models/timer';
import * as moment from 'moment';

export interface StopWatchState {
  running: boolean;
  log: TimeLog;
  loaded: boolean;
  loading: boolean;
}

export const initialState: StopWatchState = {
  running: false,
  log: null,
  loaded: false,
  loading: false
};

export function reducers(state = initialState, action: TimerActions): StopWatchState {
  switch (action.type) {
    case TimerActionTypes.START_TIMER:
      const log = state.log ? state.log : new TimeLog();
      // log.description = 'test';
      return {...state, running: true, log: log };
    case TimerActionTypes.STOP_TIMER:
      // const updLog = state.log
      // updLog.stopped = moment();
      return {...state, running: false };

    default:
      return state;
  }
}

export const getStopWatchRunning = (state: StopWatchState) => state.running;
export const getStopWatchLog = (state: StopWatchState) => state.log;
export const getStopWatchLoaded = (state: StopWatchState) => state.loaded;
export const getStopWatchLoading = (state: StopWatchState) => state.loading;

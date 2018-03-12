import * as fromTimer from './../actions/timer.actions';
import { TimeEntry } from '../models/timer';

export interface StopWatchState {
  running: boolean;
  logId: number;
  loaded: boolean;
  loading: boolean;
}

export const initialState: StopWatchState = {
  running: false,
  logId: null,
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromTimer.TimerActions): StopWatchState {
  switch (action.type) {
    default:
      return state;
  }
}

export const getStopWatchRunning = (state: StopWatchState) => state.running;
export const getStopWatchLogId = (state: StopWatchState) => state.logId;
export const getStopWatchLoaded = (state: StopWatchState) => state.loaded;
export const getStopWatchLoading = (state: StopWatchState) => state.loading;

import * as fromTimer from './../actions/timer.actions';
import { TimeEntry } from '../models/timer';

export interface TimeLogState {
  entities: { [id: number]: TimeEntry },
  loaded: boolean;
  loading: boolean;
}

export const initialState: TimeLogState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromTimer.TimerActions): TimeLogState {
  switch (action.type) {
    default:
      return state;
  }
}

export const getTimeLogsEntities = (state: TimeLogState) => state.entities;
export const getTimeLogsLoading = (state: TimeLogState) => state.loading;
export const getTimeLogsLoaded = (state: TimeLogState) => state.loaded;

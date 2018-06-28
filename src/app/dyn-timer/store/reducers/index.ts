// import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
// import * as fromTimeLogs from './time-logs';
// import * as fromStopWatch from './stop-watch';

// export const getTimerState = createFeatureSelector<TimerState>('timer');

// export interface TimerState {
//   stopWatch: fromStopWatch.StopWatchState;
//   logs: fromTimeLogs.TimeLogState
// }

// export const reducers: ActionReducerMap<TimerState> = {
//     stopWatch: fromStopWatch.reducers,
//     logs: fromTimeLogs.reducers
// }

// // ----------------------------------------------------------------------------------
// // Time Logs Selectors
// // ----------------------------------------------------------------------------------
// export const getTimeLogsState = createSelector(
//     getTimerState,
//     (state: TimerState) => state.logs
// );

// export const getTimeLogEntities = createSelector(
//     getTimeLogsState,
//     fromTimeLogs.getTimeLogsEntities
// );

// export const getAllTimeLogs = createSelector(fromTimeLogs.getTimeLogsEntities, entities => {
//     return Object.keys(entities).map(id => entities[id]);
// });

// // ----------------------------------------------------------------------------------
// // Stop Watch Selectors
// // ----------------------------------------------------------------------------------
// export const getStopWatchState = createSelector(
//     getTimerState,
//     (state: TimerState) => state.stopWatch
// );

// export const getStopWatchRunningState = createSelector(
//     getStopWatchState,
//     fromStopWatch.getStopWatchRunning
// )

// export const getStopWatchCurrentLog = createSelector(
//     getStopWatchState,
//     fromStopWatch.getStopWatchLog
// );

// export const getStopWatchExpandedState = createSelector(
//     getStopWatchState,
//     fromStopWatch.getStopWatchExpanded
// )

// import { ITimerBoard } from './board.model';

// export enum TimerBoardActionTypes {
//   CREATE_BOARD       = '[Timer Board] Create Board',
//   UPDATE_BOARD       = '[Timer Board] Update Board',
//   DELETE_BOARD       = '[Timer Board] Delete Board',
//   GET_BOARD          = '[Timer Board] Get Board',
//   GET_ALL_BOARDS     = '[Timer Board] Get All Boards',
//   GET_BOARD_TYPES    = '[Timer Board] Get Board Types'
// };

// export class CreateBoard {
//     static type = TimerBoardActionTypes.CREATE_BOARD;
//     constructor(public payload: ITimerBoard) {}
// }



// export class StopTimer implements Action {
//     readonly type = TimerActionTypes.STOP_TIMER;
//     constructor(public payload?: any) {}
// }

// export class Expand implements Action {
//     readonly type = TimerActionTypes.EXPAND;
//     constructor(public payload?: any) {}
// }

// export class Contract implements Action {
//     readonly type = TimerActionTypes.CONTRACT;
//     constructor(public payload?: any) {}
// }

// export type TimerActions =
//     StartTimer
//     | StopTimer
//     | Expand
//     | Contract;

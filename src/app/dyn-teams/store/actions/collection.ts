// import { Action } from '@ngrx/store';
// import { Team } from '../models/team';

// export enum CollectionActionTypes {
//   AddTeam = '[Collection] Add Team',
//   AddTeamSuccess = '[Collection] Add Team Success',
//   AddTeamFail = '[Collection] Add Team Fail',
//   RemoveTeam = '[Collection] Remove Team',
//   RemoveTeamSuccess = '[Collection] Remove Team Success',
//   RemoveTeamFail = '[Collection] Remove Team Fail',
//   Load = '[Collection] Load',
//   LoadSuccess = '[Collection] Load Success',
//   LoadFail = '[Collection] Load Fail',
// }

// /**
//  * Add Team to Collection Actions
//  */
// export class AddTeam implements Action {
//   readonly type = CollectionActionTypes.AddTeam;

//   constructor(public payload: Team) {}
// }

// export class AddTeamSuccess implements Action {
//   readonly type = CollectionActionTypes.AddTeamSuccess;

//   constructor(public payload: Team) {}
// }

// export class AddTeamFail implements Action {
//   readonly type = CollectionActionTypes.AddTeamFail;

//   constructor(public payload: Team) {}
// }

// /**
//  * Remove Team from Collection Actions
//  */
// export class RemoveTeam implements Action {
//   readonly type = CollectionActionTypes.RemoveTeam;

//   constructor(public payload: Team) {}
// }

// export class RemoveTeamSuccess implements Action {
//   readonly type = CollectionActionTypes.RemoveTeamSuccess;

//   constructor(public payload: Team) {}
// }

// export class RemoveTeamFail implements Action {
//   readonly type = CollectionActionTypes.RemoveTeamFail;

//   constructor(public payload: Team) {}
// }

// /**
//  * Load Collection Actions
//  */
// export class Load implements Action {
//   readonly type = CollectionActionTypes.Load;
// }

// export class LoadSuccess implements Action {
//   readonly type = CollectionActionTypes.LoadSuccess;

//   constructor(public payload: Team[]) {}
// }

// export class LoadFail implements Action {
//   readonly type = CollectionActionTypes.LoadFail;

//   constructor(public payload: any) {}
// }

// export type CollectionActions =
//   | AddTeam
//   | AddTeamSuccess
//   | AddTeamFail
//   | RemoveTeam
//   | RemoveTeamSuccess
//   | RemoveTeamFail
//   | Load
//   | LoadSuccess
//   | LoadFail;

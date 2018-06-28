// import { Action } from '@ngrx/store';
// import { Team } from '../models/team';

// export enum TeamActionTypes {
//   Search = '[Team] Search',
//   SearchComplete = '[Team] Search Complete',
//   SearchError = '[Team] Search Error',
//   Load = '[Team] Load',
//   Select = '[Team] Select',
// }

// /**
//  * Every action is comprised of at least a type and an optional
//  * payload. Expressing actions as classes enables powerful
//  * type checking in reducer functions.
//  *
//  * See Discriminated Unions: https://www.typescriptlang.org/docs/handteam/advanced-types.html#discriminated-unions
//  */
// export class Search implements Action {
//   readonly type = TeamActionTypes.Search;

//   constructor(public payload: string) {}
// }

// export class SearchComplete implements Action {
//   readonly type = TeamActionTypes.SearchComplete;

//   constructor(public payload: Team[]) {}
// }

// export class SearchError implements Action {
//   readonly type = TeamActionTypes.SearchError;

//   constructor(public payload: string) {}
// }

// export class Load implements Action {
//   readonly type = TeamActionTypes.Load;

//   constructor(public payload: Team) {}
// }

// export class Select implements Action {
//   readonly type = TeamActionTypes.Select;

//   constructor(public payload: string) {}
// }

// /**
//  * Export a type alias of all actions in this action group
//  * so that reducers can easily compose action types
//  */
// export type TeamActions = Search | SearchComplete | SearchError | Load | Select;

// import {
//     createSelector,
//     createFeatureSelector,
//     ActionReducerMap,
// } from '@ngrx/store';
// import * as fromTeams from './teams';
// import * as fromCollection from './collection';

// export interface TeamsState {
//     teams: fromTeams.State;
//     collection: fromCollection.State;
// }

// export interface State {
//     teams: TeamsState;
// }

// export const reducers: ActionReducerMap<TeamsState> = {
//     teams: fromTeams.reducer,
//     collection: fromCollection.reducer,
// };

// /**
//  * A selector function is a map function factory. We pass it parameters and it
//  * returns a function that maps from the larger state tree into a smaller
//  * piece of state. This selector simply selects the `teams` state.
//  *
//  * Selectors are used with the `select` operator.
//  *
//  * ```ts
//  * class MyComponent {
//  *   constructor(state$: Observable<State>) {
//  *     this.teamsState$ = state$.pipe(select(getTeamsState));
//  *   }
//  * }
//  * ```
//  */

// /**
//  * The createFeatureSelector function selects a piece of state from the root of the state object.
//  * This is used for selecting feature states that are loaded eagerly or lazily.
//  */
// export const getTeamsState = createFeatureSelector<TeamsState>('teams');

// /**
//  * Every reducer module exports selector functions, however child reducers
//  * have no knowledge of the overall state tree. To make them usable, we
//  * need to make new selectors that wrap them.
//  *
//  * The createSelector function creates very efficient selectors that are memoized and
//  * only recompute when arguments change. The created selectors can also be composed
//  * together to select different pieces of state.
//  */
// export const getTeamEntitiesState = createSelector(
//     getTeamsState,
//     state => state.teams
// );

// export const getSelectedTeamId = createSelector(
//     getTeamEntitiesState,
//     fromTeams.getSelectedId
// );

// /**
//  * Adapters created with @ngrx/entity generate
//  * commonly used selector functions including
//  * getting all ids in the record set, a dictionary
//  * of the records by id, an array of records and
//  * the total number of records. This reduces boilerplate
//  * in selecting records from the entity state.
//  */
// export const {
//     selectIds: getTeamIds,
//     selectEntities: getTeamEntities,
//     selectAll: getAllTeams,
//     selectTotal: getTotalTeams,
// } = fromTeams.adapter.getSelectors(getTeamEntitiesState);

// export const getSelectedTeam = createSelector(
//     getTeamEntities,
//     getSelectedTeamId,
//     (entities, selectedId) => {
//         return selectedId && entities[selectedId];
//     }
// );

// /**
//  * Just like with the teams selectors, we also have to compose the search
//  * reducer's and collection reducer's selectors.
//  */
// /**
//  * Some selector functions create joins across parts of state. This selector
//  * composes the search result IDs to return an array of teams in the store.
//  */

// export const getCollectionState = createSelector(
//     getTeamsState,
//     (state: TeamsState) => state.collection
// );

// export const getCollectionLoaded = createSelector(
//     getCollectionState,
//     fromCollection.getLoaded
// );
// export const getCollectionLoading = createSelector(
//     getCollectionState,
//     fromCollection.getLoading
// );
// export const getCollectionTeamIds = createSelector(
//     getCollectionState,
//     fromCollection.getIds
// );

// export const getTeamCollection = createSelector(
//     getTeamEntities,
//     getCollectionTeamIds,
//     (entities, ids) => {
//         return ids.map(id => entities[id]);
//     }
// );

// export const isSelectedTeamInCollection = createSelector(
//     getCollectionTeamIds,
//     getSelectedTeamId,
//     (ids, selected) => {
//         return ids.indexOf(selected) > -1;
//     }
// );

import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromSideMenu from './side-menu';

export interface NavState {
  sideMenu: fromSideMenu.State;
}

export interface State {
  nav: NavState;
}

export const navReducers = {
  sideMenu: fromSideMenu.reducer
};

export const selectNavState = createFeatureSelector<NavState>('nav');

export const selectNavSideMenuState = createSelector(
  selectNavState,
  (state: NavState) => state.sideMenu
);
export const getExpanded = createSelector(
  selectNavSideMenuState,
  fromSideMenu.getExpandedState
);

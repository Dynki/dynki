import { Action, Selector, State, StateContext, createSelector } from '@ngxs/store';

import * as menuActions from './menu.actions';
import { MenuStateModel, DynMenu } from './menu.model';

@State<MenuStateModel>({
    name: 'menu',
    defaults: {
        menus: []
    }
})
export class MenuState {

    /**
     * Selectors
     */
    @Selector() static menus(state: MenuStateModel): DynMenu[] {
        return state.menus;
    }

    static getMenu(name: string) {
        return createSelector([MenuState], (state: MenuStateModel) => state.menus.find(m => m.title === name));
    }

    constructor() { }

    /**
     * Commands
     */
    @Action(menuActions.LoadItems)
    loadItems(ctx: StateContext<MenuStateModel>, event: menuActions.LoadItems) {
        ctx.patchState({ menus: [event.payload] })
    }

    @Action(menuActions.LoadSubItems)
    loadSubItems(ctx: StateContext<MenuStateModel>, event: menuActions.LoadSubItems) {
        const menus = ctx.getState().menus;
        menus.map(m => {
                m.items.map(i => {
                    if (i.title === event.title) {
                        i.submenu = event.items;
                    }
                    return i;
                });
            return m;
        });

        ctx.patchState({ menus });
    }

    /**
     * Events
     */
}

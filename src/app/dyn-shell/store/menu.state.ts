import { Action, Selector, State, StateContext, createSelector } from '@ngxs/store';

import * as menuActions from './menu.actions';
import { MenuStateModel, DynMenu } from './menu.model';
import { MenuService } from '../services/dyn-menu.service';
import { MenuBuilder } from '../services/dyn-menu.builder';

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

    constructor(
        private menuService: MenuService,
        private menuBuilder: MenuBuilder
    ) { }

    /**
     * Commands
     */
    @Action(menuActions.NewMenuFolder)
    newMenuFolder(ctx: StateContext<MenuStateModel>, event: menuActions.NewMenuFolder) {
        this.menuService.createMenuFolder(event.itemName);
    }

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
        console.log('Menu::State::menus::', menus);
        ctx.patchState({ menus });
    }

    @Action(menuActions.LoadFolders)
    loadFolders(ctx: StateContext<MenuStateModel>) {
        const menus = ctx.getState().menus;
        this.menuService.getFolders().subscribe(folders => {

            /**
             * Have to loop through each menu's items and attach the folders that belong to that menu
             */
            menus.map(m => {
                    m.items.map(i => {
                        if (i.submenu) {
                            i.submenu = [...i.submenu.filter(s => !s.isFolder), ...folders];
                        }
                        console.log('Menu::State::folders::', i.submenu)
                        return i;
                    });
                return m;
            });
            console.log('Patched menu::', menus);
            ctx.patchState({ menus });
        });


    }

    /**
     * Events
     */
}
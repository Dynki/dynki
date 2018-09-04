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
    ) {}

    /**
     * Commands
     */
    @Action(menuActions.InitMenus)
    initMenus(ctx: StateContext<MenuStateModel>) {
        this.menuService.initialiseMenus();
    }

    @Action(menuActions.NewMenuFolder)
    newMenuFolder(ctx: StateContext<MenuStateModel>, event: menuActions.NewMenuFolder) {
        this.menuService.createMenuFolder(event.itemName);
    }

    @Action(menuActions.UpdateFolder)
    updateFolder(ctx: StateContext<MenuStateModel>, event: menuActions.UpdateFolder) {
        this.menuService.updateFolder(event.folderItem);
    }

    @Action(menuActions.DeleteFolder)
    deleteFolder(ctx: StateContext<MenuStateModel>, event: menuActions.DeleteFolder) {
        this.menuService.deleteFolder(event.folderItem.id);
    }

    @Action(menuActions.LoadItems)
    loadItems(ctx: StateContext<MenuStateModel>, event: menuActions.LoadItems) {
        const currentMenus = ctx.getState().menus;
        const updatedMenus = [...currentMenus.filter(m => m.title !== event.payload.title), event.payload]
        console.log('UpdatedMenus::', updatedMenus);
        ctx.patchState({ menus: updatedMenus });
    }

    @Action(menuActions.LoadSubItems)
    loadSubItems(ctx: StateContext<MenuStateModel>, event: menuActions.LoadSubItems) {
        const menus = ctx.getState().menus;
        console.log('Menus::', menus);
        menus.map(m => {
                m.items.map(i => {
                    if (i.title === event.title) {
                        i.items = event.items;
                    }
                    return i;
                });
            return m;
        });
        ctx.patchState({ menus });
    }

    @Action(menuActions.LoadFolders)
    loadFolders(ctx: StateContext<MenuStateModel>, event: menuActions.LoadFolders) {
        const menus = ctx.getState().menus;
        this.menuService.getFolders().subscribe(folders => {
            console.log('Folders::', folders);
            /**
             * Have to loop through each menu's items and attach the folders that belong to that menu
             */
            menus
            .filter(m => m.title === event.title)
            .map(m => {
                    m.items.map(i => {
                        if (i.items) {
                            i.items = [...i.items.filter(s => !s.isFolder), ...folders];
                        }
                        return i;
                    });
                return m;
            });
            ctx.patchState({ menus });
        });
    }

    /**
     * Events
     */
}

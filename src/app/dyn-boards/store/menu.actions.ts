import { DynMenu, DynMenuItem } from './menu.model';

export enum MenuActionTypes {
    LOAD_ITEMS = '[Menu] Load Items',
    LOAD_SUB_ITEMS = '[Menu] Load Sub Items'
};

export class LoadItems {
    static type = MenuActionTypes.LOAD_ITEMS;
    constructor(public payload: DynMenu) { }
}

export class LoadSubItems {
    static type = MenuActionTypes.LOAD_SUB_ITEMS;
    constructor(public title: string, public items: DynMenuItem[]) { }
}

export type MenuActions =
    LoadItems |
    LoadSubItems;

import { DynMenu, DynMenuItem } from './menu.model';

export enum MenuActionTypes {
    LOAD_ITEMS      = '[Menu] Load Items',
    LOAD_SUB_ITEMS  = '[Menu] Load Sub Items',
    NEW_MENU_FOLDER = '[Menu] New Folder',
    LOAD_FOLDERS    = '[Menu] Load Folders'
};

export class LoadItems {
    static type = MenuActionTypes.LOAD_ITEMS;
    constructor(public payload: DynMenu) { }
}

export class LoadSubItems {
    static type = MenuActionTypes.LOAD_SUB_ITEMS;
    constructor(public title: string, public items: DynMenuItem[]) { }
}

export class NewMenuFolder {
    static type = MenuActionTypes.NEW_MENU_FOLDER;
    constructor(public itemName: string) { }
}

export class LoadFolders {
    static type = MenuActionTypes.LOAD_FOLDERS
    constructor() { }
}

export type MenuActions =
    LoadItems       |
    LoadSubItems    |
    NewMenuFolder   |
    LoadFolders;

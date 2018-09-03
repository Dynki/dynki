import { DynMenu, DynMenuItem } from './menu.model';

export enum MenuActionTypes {
    LOAD_ITEMS      = '[Menu] Load Items',
    LOAD_SUB_ITEMS  = '[Menu] Load Sub Items',
    NEW_MENU_FOLDER = '[Menu] New Folder',
    LOAD_FOLDERS    = '[Menu] Load Folders',
    UPDATE_FOLDER   = '[Menu] Update Folder',
    DELETE_FOLDER   = '[Menu] Delete Folder',
    LOAD_MENU       = '[Menu] Load Menu',
    UPDATE_MENU     = '[Menu] Update Menu'
};

export class LoadMenu {
    static type = MenuActionTypes.LOAD_MENU;
    constructor(public title: string) { }
}

export class UpdateMenu {
    static type = MenuActionTypes.UPDATE_MENU;
    constructor(public payload: DynMenu) { }
}


export class LoadItems {
    static type = MenuActionTypes.LOAD_ITEMS;
    constructor(public payload: DynMenu) { }
}

export class LoadSubItems {
    static type = MenuActionTypes.LOAD_SUB_ITEMS;
    constructor(public title: string, public items: any[]) { }
}

export class NewMenuFolder {
    static type = MenuActionTypes.NEW_MENU_FOLDER;
    constructor(public itemName: string) { }
}

export class LoadFolders {
    static type = MenuActionTypes.LOAD_FOLDERS
    constructor() { }
}

export class UpdateFolder {
    static type = MenuActionTypes.UPDATE_FOLDER
    constructor(public folderItem: DynMenuItem) { }
}

export class DeleteFolder {
    static type = MenuActionTypes.DELETE_FOLDER
    constructor(public folderItem: DynMenuItem) { }
}

export type MenuActions =
    LoadItems       |
    LoadSubItems    |
    NewMenuFolder   |
    LoadFolders     |
    UpdateFolder    |
    DeleteFolder;

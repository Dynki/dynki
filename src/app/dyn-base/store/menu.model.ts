import { MenuBuilder } from '../services/dyn-menu.builder';

export interface DynMenu {
    title: string;
    items: Array<DynMenuItem>;
}

export interface DynMenuItem {
    id?: string;
    title: string;
    icon?: string;
    button?: DynMenuButton;
    expanded?: boolean;
    submenu?: Array<DynMenuItem>
    folders?: boolean;
    isFolder?: boolean;
    isFolderOf?: string;
    clickAction?: any;
}

export class MenuItem implements DynMenuItem {
    title: string;
    icon: string;
    button: DynMenuButton;
    expanded: boolean;
    submenu: Array<DynMenuItem>
    folders: boolean;
    isFolder: boolean;
    clickAction: any;
    isFolderOf: string;

    constructor(builder: MenuBuilder) {
        this.title = builder.title;
        this.icon = builder.icon;
        this.button = builder.button;
        this.expanded = builder.expanded;
        this.submenu = builder.submenu;
        this.folders = builder.folders;
        this.isFolder = builder.isFolder;
        this.clickAction = builder.clickAction;
        this.isFolderOf = builder.isFolderOf;
    }
}

export interface DynMenuButton {
    caption: string;
    title: string;
    type?: string;
    icon: string;
    clickAction?: any;
}

export interface MenuStateModel {
    menus: Array<DynMenu>;
}


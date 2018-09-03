import { MenuBuilder } from '../services/dyn-menu.builder';

export interface DynMenu {
    id?: string;
    title: string;
    items: Array<DynMenuItem>;
}

export interface DynMenuItem {
    id: string;
    parent: string;
    title: string;
    icon: string;
    button: DynMenuButton;
    items: Array<DynMenuItem>
    isFolder: boolean;
    isSelected: boolean;
    foldersAllowed: boolean;
    clickAction: any;
}

export class MenuItem implements DynMenuItem {
    id = null;
    parent = null;
    title = null;
    icon = null;
    button = null;
    items = null;
    isFolder = false;
    isSelected = false;
    foldersAllowed = false;
    clickAction = null;

    constructor(builder: MenuBuilder) {
        this.parent = builder.parent;
        this.title = builder.title;
        this.icon = builder.icon;
        this.button = builder.button;
        this.items = builder.items;
        this.isFolder = builder.isFolder;
        this.isSelected = builder.isSelected;
        this.clickAction = builder.clickAction;
        this.foldersAllowed = builder.foldersAllowed;
    }
}

export interface DynMenuButton {
    caption?: string;
    title?: string;
    type?: string;
    icon?: string;
    clickAction?: any;
}

export interface MenuStateModel {
    menus: Array<DynMenu>;
}

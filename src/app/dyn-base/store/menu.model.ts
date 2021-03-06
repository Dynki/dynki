import { MenuBuilder } from '../services/dyn-menu.builder';
import { Observable } from 'rxjs';

export interface DynMenu {
    id?: string;
    title: string;
    items: Array<DynMenuItem>;
}

export interface DynMenuItem {
    id?: string;
    parent: string;
    title: string;
    icon: string;
    button: DynMenuButton;
    badgeCount: Observable<number>;
    items: Array<DynMenuItem>
    isFolder: boolean;
    isSelected: boolean;
    foldersAllowed: boolean;
    clickAction: any;
    data: any;
}

export class MenuItem implements DynMenuItem {
    id? = null;
    parent = null;
    title = null;
    icon = null;
    button = null;
    badgeCount = undefined;
    items = null;
    isFolder = false;
    isSelected = false;
    foldersAllowed = false;
    clickAction = null;
    data = null;

    constructor(builder: MenuBuilder) {
        this.parent = builder.parent;
        this.title = builder.title;
        this.icon = builder.icon;
        this.button = builder.button;
        this.items = builder.items;
        this.badgeCount = builder.badgeCount;
        this.isFolder = builder.isFolder;
        this.isSelected = builder.isSelected;
        this.clickAction = builder.clickAction;
        this.foldersAllowed = builder.foldersAllowed;
        this.data = builder.data;
    }
}

export interface DynMenuButton {
    caption?: string;
    title?: string;
    type?: string;
    icon?: string;
    clickAction?
    : any;
}

export interface MenuStateModel {
    menus: Array<DynMenu>;
    activeMenu: DynMenuItem;
}

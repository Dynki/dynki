import { DynMenuButton, DynMenuItem, MenuItem } from '../store/menu.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuBuilder {
    private _title: string;
    private _icon: string;
    private _button: DynMenuButton;
    private _expanded: boolean;
    private _submenu: Array<DynMenuItem>
    private _folders: boolean;
    private _isFolder: boolean;
    private _isFolderOf: string;
    private _clickAction: any;

    constructor() {}

    get title() {
        return this._title;
    }
    setTitle(value: string): this {
        this._title = value;
        return this;
    }
    get icon() {
        return this._icon;
    }
    setIcon(value: string): this {
        this._icon = value;
        return this;
    }
    get button() {
        return this._button;
    }
    setButton(value: DynMenuButton): this {
        this._button = value;
        return this;
    }
    get expanded() {
        return this._expanded;
    }
    setExpanded(value: boolean): this {
        this._expanded = value;
        return this;
    }
    get submenu() {
        return this._submenu;
    }
    setSubmenu(value: DynMenuItem[]): this {
        this._submenu = value;
        return this;
    }
    get folders() {
        return this._folders;
    }
    setFolders(value: boolean): this {
        this._folders = value;
        return this;
    }
    get isFolder() {
        return this._isFolder;
    }
    setIsFolder(value: boolean): this {
        this._isFolder = value;
        return this;
    }
    get isFolderOf() {
        return this._isFolderOf;
    }
    setIsFolderOf(value: string): this {
        this._isFolderOf = value;
        return this;
    }
    get clickAction() {
        return this._clickAction;
    }
    setClickAction(value: any): this {
        this._clickAction = value;
        return this;
    }

    build(): MenuItem {
        return new MenuItem(this);
    }
}


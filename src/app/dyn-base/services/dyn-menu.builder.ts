import { DynMenuButton, DynMenuItem, MenuItem } from '../store/menu.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuBuilder {
    private _title: string;
    private _icon: string;
    private _button: DynMenuButton;
    private _badgeCount: number;
    private _items: Array<DynMenuItem>
    private _isFolder: boolean;
    private _parent: string;
    private _clickAction: any;
    private _isSelected: boolean;
    private _foldersAllowed: boolean;

    constructor() {
        this.reset();
    }

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
    get badgeCount() {
        return this._badgeCount;
    }
    setBadgeCount(value: number): this {
        this._badgeCount = value;
        return this;
    }
    get items() {
        return this._items;
    }
    setSubmenu(value: DynMenuItem[]): this {
        this._items = value;
        return this;
    }
    get isSelected() {
        return this._isSelected;
    }
    setSelected(value: boolean): this {
        this._isSelected = value;
        return this;
    }
    get isFolder() {
        return this._isFolder;
    }
    setIsFolder(value: boolean): this {
        this._isFolder = value;
        return this;
    }
    get foldersAllowed() {
        return this._foldersAllowed;
    }
    setFoldersAllowed(value: boolean): this {
        this._foldersAllowed = value;
        return this;
    }
    get parent() {
        return this._parent;
    }
    setParent(value: string): this {
        this._parent = value;
        return this;
    }
    get clickAction() {
        return this._clickAction;
    }
    setClickAction(value: any): this {
        this._clickAction = value;
        return this;
    }

    reset() {
        this._title = null;
        this._icon = null;
        this._button = null;
        this._items = null
        this._isFolder = false;
        this._badgeCount = 0;
        this._parent = null;
        this._clickAction = null;
        this._isSelected = false;
        this._foldersAllowed = false;
    }

    build(): MenuItem {
        const item = new MenuItem(this);
        this.reset();
        return item;
    }
}

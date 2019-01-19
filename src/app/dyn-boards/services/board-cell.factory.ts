import { DynTextCellComponent } from 'app/dyn-base/components/table/cell/dyn-text-cell.component';
import { DynSelectComponent } from 'app/dyn-base/components/table/cell/dyn-select.component';
import { Component, Type } from '@angular/core';

export interface Cell {
    class: string;
    model: string;
    title: string;
    values: Array<CellValue>;
    types: Object;
    component: Type<any>;
}

interface CellValue {
    key: string;
    title: string;
    color: string;
}

export interface ICellFactory {
    createCell(type: string, model: string, title: string): Cell;
}

class BaseCell implements Cell {

    types = {
        text: DynTextCellComponent,
        select: DynSelectComponent
    }

    component = undefined;

    class: string;
    model: string;
    title: string;
    values: CellValue[];

    constructor(model: string, title: string) {
        this.model = model;
        this.title = title;
    }
}

class TextCell extends BaseCell {
    class = 'text';

    constructor(model: string, title: string) {
        super(model, title);
        this.component = this.types['text'];
    }
}

class SelectCell extends BaseCell {
    class = 'select';
    values = [{ key: '0', title: '', color: 'red' }];

    constructor(model: string, title: string) {
        super(model, title);
        this.component = this.types['select'];
    }
}

export class CellFactory implements ICellFactory {
    createCell(type: string, model: string, title: string): Cell {
        switch (type) {
            case 'text':
                return new TextCell(model, title);
            case 'select':
                return new SelectCell(model, title);
            default:
                return null;
        }
    }
}

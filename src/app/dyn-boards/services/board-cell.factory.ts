import { DynTextCellComponent } from 'app/dyn-base/components/table/cell/dyn-text-cell.component';
import { DynSelectCellComponent } from 'app/dyn-base/components/table/cell/dyn-select-cell.component';
import { Utils } from 'app/shared/utils';

export interface Cell {
    class: string;
    model: string;
    title: string;
    values: Array<CellValue>;
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
    }
}

class SelectCell extends BaseCell {
    class = 'select';
    values = [
        { key: Utils.newGuid(), title: 'Yes', color: '1E8E3E' },
        { key: Utils.newGuid(), title: 'No', color: 'D73026' }];

    constructor(model: string, title: string) {
        super(model, title);
    }
}

export class CellFactory implements ICellFactory {

    componentMap = {
        'text': DynTextCellComponent,
        'select': DynSelectCellComponent
    }

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

import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dyn-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [innerHtml]="value"><span>
    `
})
export class DynCellComponent {

    @Input() set row(row: any) {
        this._row = row;
        this.checkCellValue();
    }

    get row(): any {
        return this._row;
    }

    @Input() set column(col: any) {
        this._column = col;
        this.checkCellValue();
    };

    get column(): any {
        return this._column;
    }

    private _row: any;
    private _column: any;
    value: any;

    constructor(private cd: ChangeDetectorRef) { }

    checkCellValue() {
        let value = '';

        if (this.row && this.column) {
            value = this.valueGetter(this.row, this.column.model);
        }

        if (this.value !== value) {
            this.value = value;
            this.cd.markForCheck();
        }
    }

    valueGetter(row: any, model: any) {
        return row[model];
    }
}

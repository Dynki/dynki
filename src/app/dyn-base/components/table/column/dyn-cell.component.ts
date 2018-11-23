import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as boardActions from '../../../../dyn-boards/store/board.actions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'dyn-cell, [dyn-cell]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <form [formGroup]="cellForm" class="table__row__cell__container" [ngClass]="{ table__row__cell__container__first: firstCol }">
        <input tabindex="0" (blur)="dispatchAction(event)" (keyDown.enter)="enterPressed(event)" [formControlName]="column.model" #cell>
    </form>
    `
})
export class DynCellComponent implements OnInit {

    cellForm: FormGroup;

    @ViewChild('cell') cellRef: ElementRef;
    @Input() action: any;
    @Input() firstCol: boolean;

    @Input() set row(row: any) {
        this._row = row;
    }

    get row(): any {
        return this._row;
    }

    @Input() set column(col: any) {
        this._column = col;
        this.setCellClass(this._column.class);
    };

    get column(): any {
        return this._column;
    }

    private _row: any;
    private _column: any;
    value: any;

    ngOnInit() {
        this.cellForm = this.formBuilder.group({ [this.column.model]: this.row[this.column.model] });
        this.cellForm = new FormGroup(this.cellForm.controls, { updateOn: 'blur' });
        this.cellForm.valueChanges.subscribe(row => {
            console.log('Cell Changed::Row::', row);
            // if (this.cellForm.dirty) {
            //     console.log('Cell Changed::Row::', row);
            //     const updatedRow = { ...this.row, ...{ [this.column.model]: this.cellForm.value[this.column.model] } };
            //     this.store.dispatch(new boardActions.UpdateEntity(updatedRow));
            //     this.cellForm.markAsPristine();
            // }
        });
    }

    setCellClass(className: string) {
        const cssClass = 'table__row__cell--' + className
        this.cellRef.nativeElement.className = cssClass;
    }

    dispatchAction() {
        console.log(this.cellForm.value);
        if (this.cellForm.dirty) {
            const updatedRow = { ...this.row, ...{ [this.column.model]: this.cellForm.value[this.column.model] } };
            this.store.dispatch(new boardActions.UpdateEntity(updatedRow));
            this.cellRef.nativeElement.focus();
        }
    }

    enterPressed() {
        this.cellRef.nativeElement.blur();
    }

    constructor(
        private formBuilder: FormBuilder,
        private store: Store
    ) { }
}

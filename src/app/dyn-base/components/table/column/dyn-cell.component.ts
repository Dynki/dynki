import { Component, Input, ChangeDetectionStrategy, ViewChild, OnInit, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Store } from '@ngxs/store';
import * as boardActions from '../../../../dyn-boards/store/board.actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cell, CellFactory } from 'app/dyn-boards/services/board-cell.factory';
import { DynCellDirective } from '../cell/dyn-cell.directive';

@Component({
    selector: 'dyn-cell, [dyn-cell]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <form [formGroup]="cellForm" class="table__row__cell__container" [ngClass]="{ table__row__cell__container__first: firstCol }">
        <ng-template dynCellHost></ng-template>
    </form>
    `
})
export class DynCellComponent implements OnInit {

    cellForm: FormGroup;
    cell: Cell;

    @ViewChild('cell') cellRef: ElementRef;
    @ViewChild(DynCellDirective) cellHost: DynCellDirective;
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
        this.cell = this.cellFactory.createCell(this.column.class, this.column.model, this.column.title);
        this.cell.values = this.column.values;
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

        const comp = this.cellFactory.componentMap[this.cell.class];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp);
        const viewContainerRef = this.cellHost.viewContainerRef;
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<any>componentRef.instance).formGroup = this.cellForm;
        (<any>componentRef.instance).column = this.column;
    }

    setCellClass(className: string) {
        const cssClass = 'table__row__cell--' + className

        if (this.cellRef && this.cellRef.nativeElement) {
            this.cellRef.nativeElement.className = cssClass;
        }
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
        private store: Store,
        private cellFactory: CellFactory,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }
}

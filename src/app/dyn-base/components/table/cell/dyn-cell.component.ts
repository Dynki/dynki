import { Component, Input, ChangeDetectionStrategy, ViewChild, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cell, CellFactory } from 'app/dyn-boards/services/board-cell.factory';
import { DynCellDirective } from './dyn-cell.directive';
import { Observable } from 'rxjs';
import { Board } from 'app/dyn-boards/store/board.model';
import { Select } from '@ngxs/store';
import { BoardState } from 'app/dyn-boards/store/board.state';

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

    @ViewChild(DynCellDirective) cellHost: DynCellDirective;
    @Input() action: any;
    @Input() firstCol: boolean;
    @Select(BoardState.getCurrentBoard)
    public board$: Observable<Board>;

    @Input() set row(row: any) {
        this._row = row;
    }

    get row(): any {
        return this._row;
    }

    @Input() set column(col: any) {
        this._column = col;
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
        this.generateCell();
    }

    generateCell() {
        this.cell = this.cellFactory.createCell(this.column.class, this.column.model, this.column.title);
        this.cell.values = this.column.values;

        const comp = this.cellFactory.componentMap[this.cell.class];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp);
        const viewContainerRef = this.cellHost.viewContainerRef;
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<any>componentRef.instance).formGroup = this.cellForm;
        (<any>componentRef.instance).column = this.column;
        (<any>componentRef.instance).row = this.row;
        (<any>componentRef.instance).board$ = this.board$;
    }

    constructor(
        private formBuilder: FormBuilder,
        private cellFactory: CellFactory,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }
}

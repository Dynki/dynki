import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import * as boardActions from '../../../../dyn-boards/store/board.actions'

@Component({
    selector: 'dyn-row, [dyn-row]',
    template: `
    <div class="table__row">
        <div class="table__row__menu">
            <nz-dropdown class="table__row__menu__dropdown" [nzTrigger]="'click'" [nzPlacement]="'bottomCenter'" [nzClickHide]="false">
                <i nz-dropdown class="table__row__menu__icon anticon anticon-down-circle"></i>
                <ul nz-menu>
                    <li nz-menu-item class="table__column__menu__item" (click)="deleteRow(row)">
                        <i class="anticon anticon-delete table__column__menu__item__icon"></i>
                        <span> Remove Row</span>
                    </li>
                </ul>
            </nz-dropdown>
        </div>
        <div class="row__content draghandle">
            <div dyn-cell *ngFor="let column of columns; first as isFirst"
                [column]="column" [firstCol]="isFirst" [row]="row" [action]="action"
                [ngClass]="{'row__content__column': !isFirst , 'row__content__column--first': isFirst}"></div>
        </div>
        <section class="row__terminator">
            <div class="row__terminator__body"></div>
            <div class="row__terminator__border"></div>
        </section>
    </div>
    `
})
export class DynRowComponent {

    @Input() row: any;
    @Input() columns: any;
    @Input() action: any;
    @Input() firstRow: any;

    constructor(private store: Store) { }

    deleteRow(row: any) {
        console.log('Row::Delete');
        this.store.dispatch(new boardActions.RemoveEntity(row));
    }
}

import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import * as boardActions from '../../../dyn-boards/store/board.actions'

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
        <div class="table__row__handle"></div>
        <div class="table__row__container" *ngFor="let column of columns; first as isFirst">
            <dyn-cell [column]="column" [firstCol]="isFirst" [row]="row" [action]="action"></dyn-cell>
        </div>
        <span class="table__row__delete__icon"></span>
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

import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import * as boardActions from '../../../dyn-boards/store/board.actions'

@Component({
    selector: 'dyn-row',
    template: `
    <div class="table__row">
        <div class="table__row__container" *ngFor="let column of columns; first as isFirst">
            <dyn-cell [column]="column" [firstCol]="isFirst" [row]="row" [action]="action"></dyn-cell>
        </div>
        <i class="anticon anticon-delete table__row__delete__icon"
            nz-popconfirm
            nzTitle="Are you sure delete this row?" (nzOnConfirm)="deleteRow(row)">
        </i>
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

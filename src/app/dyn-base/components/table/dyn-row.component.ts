import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import * as boardActions from '../../../dyn-boards/store/board.actions'

@Component({
    selector: 'dyn-row',
    template: `
    <div class="table__row">
        <dyn-cell *ngFor="let column of columns; index as i; first as isFirst" [column]="column" [row]="row" [action]="action"></dyn-cell>
        <i
            class="anticon anticon-delete table__row__delete__icon"
            nz-popconfirm
            nzTitle="Are you sure delete this row?" (nzOnConfirm)="deleteRow(row)"></i>
    </div>
    `
})
export class DynRowComponent {

    @Input() row: any;
    @Input() columns: any;
    @Input() action: any;

    constructor(private store: Store) { }

    deleteRow(row: any) {
        console.log('Row::Delete');
        this.store.dispatch(new boardActions.RemoveEntity(row));
    }
}

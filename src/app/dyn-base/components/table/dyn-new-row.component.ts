import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import * as boardActions from '../../../dyn-boards/store/board.actions';

@Component({
  selector: 'dyn-new-row, [dyn-new-row]',
  template: `
    <div class="table__row__new">
        <input nz-input placeholder="+ Create new row" [(ngModel)]="newValue" (blur)="createNewRow()">
    </div>
    `
})
export class DynNewRowComponent {

    newValue = '';

    constructor(private store: Store) { }

    createNewRow() {
        if (this.newValue !== '') {
            this.store.dispatch(new boardActions.NewEntity(this.newValue));
            this.newValue = '';
        }
    }
}

import { Component, Input } from '@angular/core';
import * as boardActions from '../../../../dyn-boards/store/board.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'dyn-th-menu, [dyn-th-menu]',
  template: `
    <div class="table__column">
        <nz-dropdown
            [nzTrigger]="'hover'"
            class="table__column__menu"
            [nzPlacement]="'bottomCenter'"
            [nzClickHide]="false">
            <button nz-dropdown nz-button nzType="default" [nzSize]="'small'" nzShape="circle">
                <i class="anticon anticon-down"></i>
            </button>
            <ul nz-menu>
                <li nz-menu-item class="table__column__menu__item" (click)="removeColumn(column)">
                    <i class="anticon anticon-delete table__column__menu__item__icon"></i>
                    <span> Remove Column</span>
                </li>
            </ul>
        </nz-dropdown>
    </div>
`
})
export class DynHeaderComponent {

    @Input() columns: any;

    constructor(private store: Store) { }

    updateColumn(col: any) {
        this.store.dispatch(new boardActions.UpdateColumn(col));
    }

    addColumn(type: string) {
        this.store.dispatch(new boardActions.AddColumn(type));
    }

    removeColumn(col: any) {
        this.store.dispatch(new boardActions.RemoveColumn(col));
    }
}

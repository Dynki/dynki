import { Component, Input } from '@angular/core';
import * as boardActions from '../../../dyn-boards/store/board.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'dyn-header',
  template: `
    <div class="table__header" *ngFor="let column of columns; first as isFirst">
        <input [(ngModel)]="column.title" (blur)="updateColumn(column)" class="table__header__input text--no-border" type="text">
        <nz-dropdown class="table__header__menu" [nzPlacement]="'bottomRight'" [nzClickHide]="false">
            <i nz-dropdown class="table__header__menu__icon anticon anticon-plus-circle"></i>
            <ul nz-menu>
                <li nz-menu-item class="table__header__menu__item">
                    <i class="anticon anticon-form"></i>
                    <span>Text</span>
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
}

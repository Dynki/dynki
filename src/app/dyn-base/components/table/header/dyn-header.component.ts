import { Component, Input } from '@angular/core';
import * as boardActions from '../../../../dyn-boards/store/board.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'dyn-header, [dyn-header]',
  template: `
    <section class="table__header">
        <div class="table__header__columns">
            <div *ngFor="let column of columns; first as isFirst"
                [ngClass]="{'table__header__columns__container': !isFirst , 'table__header__columns__container--first': isFirst}">
                <i *ngIf="!isFirst"
                    class="anticon anticon-close-square-o"
                    nz-tooltip
                    nz-popconfirm nzTitle="Delete this column?" (nzOnConfirm)="removeColumn(column)">
                </i>
                <input [(ngModel)]="column.title" (blur)="updateColumn(column)" class="table__header__input text--no-border" type="text">
            </div>
        </div>
        <div class="table__header__menu__container">
            <nz-dropdown [nzTrigger]="'click'" class="table__header__menu__container__dropdown"
            [nzPlacement]="'bottomRight'" [nzClickHide]="false">
                <i nz-dropdown nz-tooltip [nzPlacement]="'left'" [nzTitle]="'Add Column'"
                class="table__header__menu__container__dropdown__icon anticon anticon-plus-circle"></i>
                <ul nz-menu>
                    <li nz-menu-item class="table__header__menu__container__dropdown__item" (click)="addColumn('text')">
                        <i class="anticon anticon-form"></i>
                        <span>Text</span>
                    </li>
                    <li nz-menu-item class="table__header__menu__container__dropdown__item" (click)="addColumn('select')">
                        <i nz-icon type="tag" theme="twotone"></i>
                        <span>Select</span>
                    </li>
                </ul>
            </nz-dropdown>
        </div>
    </section>
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

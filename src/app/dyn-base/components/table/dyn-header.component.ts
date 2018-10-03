import { Component, Input } from '@angular/core';
import * as boardActions from '../../../dyn-boards/store/board.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'dyn-header',
  template: `
    <div class="table__header">
        <div class="table__header__columns">
            <div *ngFor="let column of columns; first as isFirst" class="table__header__columns__container">
                <div class="table__column">
                    <nz-dropdown [nzTrigger]="'hover'" class="table__column__menu" [nzPlacement]="'bottomCenter'" [nzClickHide]="false">
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
                <input
                [(ngModel)]="column.title" (blur)="updateColumn(column)" class="table__header__input text--no-border" type="text">
            </div>
        </div>
        <div class="table__header__menu__container">
            <nz-dropdown [nzTrigger]="'click'"
            class="table__header__menu__container__dropdown" [nzPlacement]="'bottomRight'" [nzClickHide]="false">
                <i nz-dropdown nz-tooltip [nzPlacement]="'left'"
                    [nzTitle]="'Add Column'" class="table__header__menu__container__dropdown__icon anticon anticon-plus-circle"></i>
                <ul nz-menu>
                    <li nz-menu-item class="table__header__menu__container__dropdown__item" (click)="addColumn('text')">
                        <i class="anticon anticon-form"></i>
                        <span>Text</span>
                    </li>
                </ul>
            </nz-dropdown>
        </div>
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

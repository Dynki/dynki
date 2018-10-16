import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import * as boardActions from '../../../dyn-boards/store/board.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'dyn-table',
  template: `
    <table class="table">
        <tr dyn-header [columns]="columns"></tr>
        <div class="table__rc" dynSortable [selector]="'dyn-row'" [data]="rows" (stop)="updateRows($event)">
            <dyn-row *ngFor="let row of rows; index as i; first as isFirst"
            [firstRow]="isFirst"
            [row]="row"
            [columns]="columns"
            [action]="action">
            </dyn-row>
        </div>
        <tr dyn-new-row></tr>
        <tr dyn-footer></tr>
    </table>
    `
})
export class DynTableComponent implements OnInit, AfterViewInit {

    @Input() rows: any;
    @Input() columns: any;
    @Input() action: any;

    constructor(public store: Store) { }

    ngOnInit() {
        console.log('Table::rows', this.rows);
        console.log('Table::columns', this.columns);
    }

    ngAfterViewInit() {
        console.log('Table::Action::', this.action);
    }

    updateRows($event: any) {
        this.store.dispatch(new boardActions.UpdateEntities($event));
    }
}

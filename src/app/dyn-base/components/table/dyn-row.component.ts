import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'dyn-row',
    template: `
    <div class="table__row">
        <dyn-cell *ngFor="let column of columns; index as i; first as isFirst" [column]="column" [row]="row" [action]="action"></dyn-cell>
        <i class="anticon anticon-delete table__row__delete__icon" nz-tooltip nzTitle="Delete Row"></i>
    </div>
    `
})
export class DynRowComponent {

    @Input() row: any;
    @Input() columns: any;
    @Input() action: any;

    constructor() { }
}

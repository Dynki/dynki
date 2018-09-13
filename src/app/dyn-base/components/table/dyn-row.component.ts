import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'dyn-row',
    template: `
    <div class="table__row">
        <dyn-cell *ngFor="let column of columns; index as i; first as isFirst" [column]="column" [row]="row"></dyn-cell>
    </div>
    `
})
export class DynRowComponent {

    @Input() row: any;
    @Input() columns: any;

    constructor() { }
}

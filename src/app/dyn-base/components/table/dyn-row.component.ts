import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'dyn-row',
    template: `
    <dyn-cell *ngFor="let column of columns; index as i; first as isFirst" [column]="column" [row]="row"><dyn-cell>
    `
})
export class DynRowComponent {

    @Input() row: any;
    @Input() columns: any;

    constructor() { }
}

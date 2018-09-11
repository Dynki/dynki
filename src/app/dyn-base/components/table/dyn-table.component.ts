import { Component, Input } from '@angular/core';

@Component({
  selector: 'dyn-table',
  template: `
    <dyn-header [columns]="columns"></dyn-header>
    <dyn-row *ngFor="let row of rows; index as i; first as isFirst" [columns]="columns"><dyn-row>
    <dyn-footer><dyn-footer>
    `
})
export class DynTableComponent {

    @Input() rows: any;
    @Input() columns: any;

    constructor() { }
}

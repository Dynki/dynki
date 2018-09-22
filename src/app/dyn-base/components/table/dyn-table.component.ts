import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dyn-table',
  template: `
    <div>Table</div>
    <dyn-header [columns]="columns"></dyn-header>
    <dyn-row *ngFor="let row of rows; index as i; first as isFirst" [row]="row" [columns]="columns" [action]="action"></dyn-row>
    <dyn-new-row></dyn-new-row>
    <dyn-footer></dyn-footer>
    `
})
export class DynTableComponent implements OnInit {

    @Input() rows: any;
    @Input() columns: any;
    @Input() action: any;

    constructor() { }

    ngOnInit() {
        console.log('Table::rows', this.rows);
        console.log('Table::columns', this.columns);
    }
}

import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'dyn-table',
  template: `
    <table class="table">
    <tr dyn-header [columns]="columns"></tr>
        <tr dyn-row *ngFor="let row of rows; index as i; first as isFirst"
            [firstRow]="isFirst"
            [row]="row"
            [columns]="columns"
            [action]="action">
        </tr>
        <tr dyn-new-row></tr>
        <tr dyn-footer></tr>
    </table>
    `
})
export class DynTableComponent implements OnInit, AfterViewInit {

    @Input() rows: any;
    @Input() columns: any;
    @Input() action: any;

    constructor() { }

    ngOnInit() {
        console.log('Table::rows', this.rows);
        console.log('Table::columns', this.columns);
    }

    ngAfterViewInit() {
        console.log('Table::Action::', this.action);
    }
}

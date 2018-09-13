import { Component, Input } from '@angular/core';

@Component({
  selector: 'dyn-table-container',
  template: `
    <div class="table" *ngIf="row$ | async as rows">
        <dyn-table [rows]="rows" [columns]="columns"></dyn-table>
    </div>`
})
export class DynTableContainerComponent {

    @Input() row$: any;
    @Input() columns: any;

    constructor() { }
}

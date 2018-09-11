import { Component, Input } from '@angular/core';

@Component({
  selector: 'dyn-row',
  template: `
    <dyn-cell *ngFor="let col of columns; index as i; first as isFirst" [row]="row"><dyn-cell>
    `
})
export class DynRowComponent {

    @Input() row: any;
    @Input() columns: any;

    constructor() { }
}

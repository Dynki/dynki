import { Component } from '@angular/core';

@Component({
  selector: 'dyn-folder-item',
  template: '<dyn-table [data]="data" ></dyn-table>'
})
export class DynTableComponent {
    constructor() { }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'dyn-header',
  template: `
    <div></div>
    `
})
export class DynHeaderComponent {

    @Input() columns: any;

    constructor() { }
}

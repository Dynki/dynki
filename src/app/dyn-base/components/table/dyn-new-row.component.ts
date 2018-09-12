import { Component, Input } from '@angular/core';

@Component({
  selector: 'dyn-new-row',
  template: `
    <div></div>
    `
})
export class DynNewRowComponent {

    @Input() rows: any;

    constructor() { }
}

import { Component } from '@angular/core';

@Component({
  selector: 'dyn-select-cell',
  template: `
    <button
        dynSelect
        nzTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPlacement="bottom"
        nz-button>Select
    </button>
    `
})
export class DynSelectCellComponent { }

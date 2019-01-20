import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
export class DynSelectCellComponent {

    @Input() formGroup: FormGroup;
}

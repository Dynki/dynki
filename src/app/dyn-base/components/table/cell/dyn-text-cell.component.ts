import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dyn-text-cell',
  template: `
    <div [formGroup]="formGroup">
        <input class="table__row__cell--text"
            tabindex="0"
            (blur)="dispatchAction(event)"
            (keyDown.enter)="enterPressed(event)"
            [formControlName]="column.model"
            #cell>
    </div>
    `
})
export class DynTextCellComponent {
    @Input() column: any;
    @Input() formGroup: FormGroup
}

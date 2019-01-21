import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import * as boardActions from '../../../../dyn-boards/store/board.actions';

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
    @Input() row: any;
    @Input() formGroup: FormGroup
    @ViewChild('cell') cellRef: ElementRef;

    dispatchAction() {
        console.log(this.formGroup.value);
        if (this.formGroup.dirty) {
            const updatedRow = { ...this.row, ...{ [this.column.model]: this.formGroup.value[this.column.model] } };
            this.store.dispatch(new boardActions.UpdateEntity(updatedRow));
        }
    }

    enterPressed() {
        this.cellRef.nativeElement.blur();
    }

    constructor(
        private store: Store
    ) {}
}

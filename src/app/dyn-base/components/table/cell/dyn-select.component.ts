import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NzPopconfirmComponent } from 'ng-zorro-antd';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import * as boardActions from 'app/dyn-boards/store/board.actions';

@Component({
    selector: 'dyn-select',
    templateUrl: './dyn-select.component.html'
})
export class DynSelectComponent extends NzPopconfirmComponent implements OnInit {

    @Input() row: any;
    @Input() column: any;
    @Input() formGroup: FormGroup;
    @ViewChild('text') textRef: ElementRef;

    editMode = false;

    constructor(cdr: ChangeDetectorRef, public store: Store) {
        super(cdr);
    }

    ngOnInit() {
        this.editMode = false;
    }

    onClick(col) {
        const updatedRow = { ...this.row, ...{ [this.column.model]: col.key } };
        this.store.dispatch(new boardActions.UpdateEntity(updatedRow));
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
    }

    dispatchAction(col) {
        this.column.values.forEach(v => {
            if (v.key === col.key) {
                v.title = col.title
            }
            return v;
        });

        this.store.dispatch(new boardActions.UpdateColumn(this.column));
    }

    enterPressed() {
        this.textRef.nativeElement.blur();
    }
}

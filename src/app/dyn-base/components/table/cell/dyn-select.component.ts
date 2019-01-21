import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

    constructor(cdr: ChangeDetectorRef, public store: Store) {
        super(cdr);
    }

    ngOnInit() {
        console.log('Select::Col::', this.column);
    }

    onClick(col) {
        const updatedRow = { ...this.row, ...{ [this.column.model]: col.key } };
        this.store.dispatch(new boardActions.UpdateEntity(updatedRow));
    }
}

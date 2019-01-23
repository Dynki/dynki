import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Select, Actions, ofActionDispatched } from '@ngxs/store';
import { BoardState } from 'app/dyn-boards/store/board.state';
import { Observable } from 'rxjs/observable';
import { Board } from 'app/dyn-boards/store/board.model';
import { takeWhile } from 'rxjs/operators';
import * as boardActions from 'app/dyn-boards/store/board.actions';

@Component({
  selector: 'dyn-select-cell',
  template: `
    <button
        [style.backgroundColor]="btnColor"
        dynSelect
        nzTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPlacement="bottom"
        class="dyn-select__btn"
        [row]="row"
        [column]="column"
        [formGroup]="formGroup"
        nz-button>{{ textContent }}
    </button>
    `
})
export class DynSelectCellComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() formGroup: FormGroup;
    @Input() row: any;
    @Input() column: any;
    @Input() board$: Observable<Board>;

    textContent: string;
    keepAlive = true;

    btnColor = '#EFF1F3';

    constructor(public actions$: Actions) {
        this.actions$
            .pipe(ofActionDispatched(boardActions.UpdateColumn))
            .subscribe((col) => this.getCellContent(col));
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.keepAlive = false;
    }

    ngAfterViewInit() {
        // this.board$.pipe(
        //     takeWhile(() => this.keepAlive)
        // ).subscribe(b => this.getCellContent(b.columns));
        this.getCellContent(this.column);
    }

    getCellContent(col) {
        const colVal = col.values.find(v => v.key === this.row[col.model]);
        this.textContent = colVal ? colVal.title : '';
        this.btnColor = colVal ? '#' + colVal.color : '#EFF1F3';
    }
}

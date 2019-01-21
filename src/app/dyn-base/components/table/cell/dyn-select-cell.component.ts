import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
export class DynSelectCellComponent implements OnInit, AfterViewInit {

    @Input() formGroup: FormGroup;
    @Input() row: any;
    @Input() column: any;

    textContent: string;

    btnColor = '#EFF1F3';

    ngOnInit() {
    }

    ngAfterViewInit() {
        const colVal = this.column.values.find(v => v.key === this.row[this.column.model]);
        this.textContent = colVal ? colVal.title : '';
        this.btnColor = colVal ? '#' + colVal.color : '#EFF1F3';
        console.log('Row::', this.row);
        console.log('Col::', this.column);
        console.log('Col::Values::', this.column.values);
        console.log('FormGroup::Value::', this.formGroup.value[this.column.model]);
        console.log('Btn::Color::', this.btnColor);
    }
}

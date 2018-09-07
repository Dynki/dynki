import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'dyn-board-detail',
  templateUrl: './dyn-board-detail.component.html'
})
export class DynBoardDetailComponent {

    @Input() board;

    boardForm = this.formBuilder.group({
      description: ''
    })

    constructor(private formBuilder: FormBuilder) { }
}

import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Board } from '../store/board.model';

@Component({
  selector: 'dyn-board-detail',
  templateUrl: './dyn-board-detail.component.html'
})
export class DynBoardDetailComponent {

    @Input() board: Board;

    boardForm = this.formBuilder.group({
      description: ''
    });

    constructor(private formBuilder: FormBuilder) {
      this.boardForm = new FormGroup(this.boardForm.controls, { updateOn: 'blur' });
      this.boardForm.valueChanges.subscribe(e => console.log(e));
    }
}

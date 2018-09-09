import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Board } from '../store/board.model';
import * as boardActions from '../../dyn-boards/store/board.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'dyn-board-detail',
  templateUrl: './dyn-board-detail.component.html'
})
export class DynBoardDetailComponent implements OnInit {

  @Input() board: Board;

  boardForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {
  }

  ngOnInit() {
    this.boardForm = this.formBuilder.group(this.board);
    this.boardForm = new FormGroup(this.boardForm.controls, { updateOn: 'blur' });
    this.boardForm.valueChanges.subscribe(board => {
      console.log(board);
      this.store.dispatch(new boardActions.UpdateBoard(board))
    });
  }
}

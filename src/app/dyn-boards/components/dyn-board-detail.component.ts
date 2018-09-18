import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Board, IBoardEntity } from '../store/board.model';
import * as boardActions from '../../dyn-boards/store/board.actions';
import { Store, Select } from '@ngxs/store';
import { of, Observable } from 'rxjs';
import { BoardState } from '../store/board.state';

@Component({
  selector: 'dyn-board-detail',
  templateUrl: './dyn-board-detail.component.html'
})
export class DynBoardDetailComponent implements OnInit {

  @Input() board: Board;

  @Select(BoardState.getCurrentBoardEntities)
  public row$: Observable<IBoardEntity[]>;

  boardForm: FormGroup;
  columns = [{ model: 'description', class: 'text' }];

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.boardForm = this.formBuilder.group(this.board);
    this.boardForm = new FormGroup(this.boardForm.controls, { updateOn: 'blur' });
    this.boardForm.valueChanges.subscribe(board => {
      console.log(board);
      this.store.dispatch(new boardActions.UpdateBoard(board))
    });
  }

  commitChange(event: KeyboardEvent) {
    // this.boardForm.setValue(this.boardForm.value);
    // window.focus();
  }
}

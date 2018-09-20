import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Form } from '@angular/forms';
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

  @ViewChild('formsubmit') formsubmit: ElementRef;
  @Input() board: Board;

  @Select(BoardState.getCurrentBoardEntities)
  public row$: Observable<IBoardEntity[]>;

  form: Form;
  boardForm: FormGroup;
  columns = [{ model: 'description', class: 'text' }];

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.boardForm = this.formBuilder.group(this.board);
    this.boardForm = new FormGroup(this.boardForm.controls, { updateOn: 'submit' });
    this.boardForm.valueChanges.subscribe(board => {
      this.store.dispatch(new boardActions.UpdateBoard(board))
    });

  }

  commitChange(event: KeyboardEvent) {
    this.formsubmit.nativeElement.click();
  }

  onSubmit(board) {
    this.formsubmit.nativeElement.click();
  }
}

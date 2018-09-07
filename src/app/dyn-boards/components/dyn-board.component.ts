import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BoardState } from '../../dyn-boards/store/board.state';
import { Select } from '@ngxs/store';
import { Board } from '../store/board.model';

@Component({
  selector: 'dyn-board',
  templateUrl: './dyn-board.component.html'
})
export class DynBoardComponent {

  @Select(BoardState.getCurrentBoard)
  public board$: Observable<Board>;

  constructor() { }
}

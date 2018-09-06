import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DynMenu } from '../../dyn-base/store/menu.model';
import { BoardState } from '../../dyn-boards/store/board.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'dyn-board',
  templateUrl: './dyn-board.component.html'
})
export class DynBoardComponent {

  @Select(BoardState.getCurrentBoard)
  public board$: Observable<DynMenu>;

  constructor() { }
}

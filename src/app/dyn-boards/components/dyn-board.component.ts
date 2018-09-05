import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DynMenu } from '../../dyn-base/store/menu.model';
import { MenuState } from '../../dyn-base/store/menu.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'dyn-choose-board',
  templateUrl: './dyn-choose-board.component.html'
})
export class DynBoardComponent {

  public menu$: Observable<DynMenu>;

  constructor() { }
}

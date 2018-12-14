import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DynMenu, DynMenuItem } from '../../dyn-base/store/menu.model';
import { MenuState } from '../../dyn-base/store/menu.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'dyn-choose-board',
  templateUrl: './dyn-choose-board.component.html'
})
export class DynChooseBoardTypeComponent {

  @Select(MenuState.getMenu('Choose-Template'))
  public menu$: Observable<DynMenu>;

  @Select(MenuState.activeMenu)
  public activeMenu$: Observable<DynMenuItem>;

  constructor() { }
}

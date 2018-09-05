import { Component, Input } from '@angular/core';

import { DynMenu } from '../store/menu.model';

@Component({
  selector: 'dyn-menu',
  templateUrl: './dyn-menu.component.html'
})
export class MenuComponent {
  @Input() menu: DynMenu;

  constructor() { }
}

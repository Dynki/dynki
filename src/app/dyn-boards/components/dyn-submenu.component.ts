import { Component, Input } from '@angular/core';
import { DynMenuItem } from './dyn-menu.model';

@Component({
  selector: 'dyn-sub-menu',
  templateUrl: './dyn-submenu.component.html'
})
export class DynSubMenuComponent {
    @Input() subitem: DynMenuItem;
    buttonVisible: false;

    constructor() {
      console.log('submenu::constructor', this.subitem);

    }
}

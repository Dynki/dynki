import { Component, Input, OnInit } from '@angular/core';

import { DynMenu } from '../store/menu.model';

@Component({
  selector: 'dyn-menu',
  templateUrl: './dyn-menu.component.html'
})
export class MenuComponent implements OnInit {
    @Input() menu: DynMenu;

    constructor() {}

    ngOnInit() {
      console.log('Menu::Comp::menu::', this.menu);
    }
}

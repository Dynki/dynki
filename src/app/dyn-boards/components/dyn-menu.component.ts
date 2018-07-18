import { Component, Input, OnInit } from '@angular/core';
import { DynMenu } from '../store/menu.model';

@Component({
  selector: 'dyn-menu',
  templateUrl: './dyn-menu.component.html'
})
export class DynMenuComponent implements OnInit {
    @Input() menu: DynMenu;

    constructor() {
      console.log('menu::constructor');
      console.log('menu::', this.menu);
    }

    ngOnInit() {
      console.log('menu::init::menu', this.menu);
    }
}

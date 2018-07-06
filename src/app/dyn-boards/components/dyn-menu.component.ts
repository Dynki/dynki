import { Component, Input, OnInit } from '@angular/core';
import { DynMenu } from './dyn-menu.model';

@Component({
  selector: 'dyn-menu',
  templateUrl: './dyn-menu.component.html'
})
export class DynMenuComponent implements OnInit {
    @Input() menu: DynMenu;

    constructor() {
      console.log('menu::constructor');
    }

    ngOnInit() {
      console.log('menu::init::menu', this.menu);
    }
}

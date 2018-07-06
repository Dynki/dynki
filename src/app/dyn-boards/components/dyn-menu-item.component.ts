import { Component, Input, OnInit } from '@angular/core';
import { DynMenuItem } from './dyn-menu.model';

@Component({
  selector: 'dyn-menu-item',
  templateUrl: './dyn-menu-item.component.html'
})
export class DynMenuItemComponent implements OnInit {
    @Input() menuitem: DynMenuItem;

    constructor() {
    }

    ngOnInit() {
      console.log('menuitem:constructor', this.menuitem);
    }
}

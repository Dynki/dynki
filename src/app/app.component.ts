import { Component } from '@angular/core';

@Component({
  selector: 'dyn-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'D';

  isCollapsed = true;
  _opened = false;

  constructor() { }

  private _toggleSidebar() {

    if (this._opened === true) {
      this._opened = false;
    } else {
      this._opened = true;
    }

  }

}

import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromNav from '../../store/reducers';

@Component({
    selector: 'dyn-post-auth',
    templateUrl: './dyn-post-auth.component.html',
})

export class PostAuthComponent {

  isCollapsed = this.store.pipe(select(fromNav.getExpanded));

  constructor(private store: Store<fromNav.State>) { }
}

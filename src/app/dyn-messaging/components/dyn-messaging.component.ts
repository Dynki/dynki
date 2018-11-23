import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import * as messageActions from '../store/message.actions';

@Component({
    selector: 'dyn-messaging',
    template: `<dyn-inbox></dyn-inbox>`
})
export class DynMessagingComponent implements OnInit {

    constructor(
        private store: Store
    ) { }

    ngOnInit() {
        console.log('Messaging::Comp::OnInit');
        this.store.dispatch(new messageActions.GetMessages());
    }
}

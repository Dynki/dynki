import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MessageState } from '../store/message.state';
import { IMessage } from '../store/message.model';

@Component({
    selector: 'dyn-inbox',
    template: `
    <section class="inbox" *ngIf="pending$ | async as pending">
        <section class="list" dyn-msglist *ngIf="message$ | async as messages" [data]="messages" [pending]="pending"></section>
        <section class="item" dyn-msg *ngIf="currentMsg$ | async as msg" [data]="msg" [pending]="pending"></section>
    </section>
    `
})
export class DynInboxComponent {

    @Select(MessageState.pending)
    pending$: Observable<boolean>;

    @Select(MessageState.getMessages)
    message$: Observable<IMessage[]>;

    @Select(MessageState.getCurrentMsg)
    currentMsg$: Observable<IMessage>;

    constructor(
        private store: Store
    ) { }
}

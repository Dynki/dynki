import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MessageState } from '../store/message.state';
import { IMessage } from '../store/message.model';

@Component({
    selector: 'dyn-inbox',
    template: `
    <section class="inbox">
        <section class="list" dyn-msglist *ngIf="message$ | async as messages" [data]="messages"></section>
        <section class="item" dyn-msg *ngIf="currentMsg$ | async as msg" [data]="msg"></section>
    </section>
    `
})
export class DynInboxComponent {

    @Select(MessageState.getMessages)
    message$: Observable<IMessage[]>;

    @Select(MessageState.getCurrentMsg)
    currentMsg$: Observable<IMessage>;

    constructor(
        private store: Store
    ) { }
}

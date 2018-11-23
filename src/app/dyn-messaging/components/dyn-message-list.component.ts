import { Component, Input } from '@angular/core';
import { IMessages } from '../store/message.model';

@Component({
    selector: 'dyn-msglist, [dyn-msglist]',
    template: `
    <section class="msglist">
        <div *ngFor="let msg of data.messages; index as i">
            <nz-card>
                <p>{{msg.subject}}</p>
                <p>{{msg.body}}</p>
            </nz-card>
        </div>
    </section>
    `
})
export class DynMessagingListComponent {

    @Input() data: IMessages;

    constructor() { }
}

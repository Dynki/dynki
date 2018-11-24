import { Component, Input } from '@angular/core';
import { IMessages } from '../store/message.model';

@Component({
    selector: 'dyn-msglist, [dyn-msglist]',
    template: `
    <section class="msglist">
        <div class="header">
            <nz-select class="sort" nzPlaceHolder="Sort" [(ngModel)]="sortOrder">
                <nz-option nzValue="recent" nzLabel="Recent"></nz-option>
                <nz-option nzValue="oldest" nzLabel="Oldest"></nz-option>
                <nz-option nzValue="from" nzLabel="From"></nz-option>
            </nz-select>
            <nz-switch class="switch" nzCheckedChildren="Un-Read" nzUnCheckedChildren="All Mail"></nz-switch>
        </div>
        <div class="msgs" *ngFor="let msg of data.messages; index as i">
            <nz-card class="msgs__card">
                <div class="panel-left">
                    <div class="avatar">D</div>
                </div>
                <div class="panel-right">
                    <div class="first-line">
                        <div class="from">{{msg.from}}</div>
                        <div class="created">10.43 AM</div>
                    </div>
                    <div class="subject">
                        <h1>{{msg.subject}}</h1>
                        <nz-badge nzStatus="processing"></nz-badge>
                    </div>
                    <p class="body">{{msg.body}}</p>
                </div>
            </nz-card>
        </div>
    </section>
    `
})
export class DynMessagingListComponent {

    @Input() data: IMessages;

    sortOrder = 'recent';

    constructor() {
    }
}

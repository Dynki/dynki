import { Component, Input } from '@angular/core';
import { IMessages } from '../store/message.model';
import * as msgActions from '../store/message.actions'
import { Store } from '@ngxs/store';

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
        <div class="msgs">
            <nz-card *ngFor="let msg of data; index as i" class="msgs__card" (click)="loadMsg(msg)">
                <div class="panel-left">
                    <div class="avatar">{{msg.from | slice:0:1}}</div>
                </div>
                <div class="panel-right">
                    <div class="first-line">
                        <div class="from">{{msg.from}}</div>
                        <div class="created">10.43 AM</div>
                    </div>
                    <div class="subject">
                        <h1>{{msg.subject}}</h1>
                        <nz-badge *ngIf="!msg.read" nzStatus="processing"></nz-badge>
                    </div>
                    <div *ngIf="msg.body[0]" class="body">{{msg.body[0].insert}}</div>
                    <div *ngIf="msg.body[1]" class="body">{{msg.body[1].insert}}</div>
                </div>
            </nz-card>
        </div>
    </section>
    `
})
export class DynMessagingListComponent {

    @Input() data: IMessages;

    sortOrder = 'recent';

    constructor(
        private store: Store
    ) {
    }

    loadMsg(msg) {
        this.store.dispatch(new msgActions.GetMessage(msg.id));
    }
}

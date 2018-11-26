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
            <nz-switch (click)="clickSwitch()"
                class="switch" [(ngModel)]="switchValue" nzCheckedChildren="Un-Read" nzUnCheckedChildren="All Mail"></nz-switch>
        </div>
        <div class="msgs">
            <div *ngFor="let msg of data; index as i" >
                <nz-card *ngIf="(!switchValue) || (switchValue && !msg.read)" class="msgs__card" (click)="loadMsg(msg)"
                    [ngClass]="{ 'msgs__card--selected': msg.selected }">

                    <div class="panel-left">
                        <div class="avatar">{{msg.from | slice:0:1}}</div>
                    </div>
                    <div class="panel-right">
                        <div class="first-line">
                            <div class="from">{{msg.from}}</div>
                            <div class="created">{{msg.created | amTimeAgo:true}}</div>
                        </div>
                        <div class="subject">
                            <h1>{{msg.subject}}</h1>
                            <nz-badge *ngIf="!msg.read" nzStatus="processing"></nz-badge>
                        </div>
                        <div *ngIf="msg.body">
                            <div *ngFor="let item of msg.body.ops; index as itemIdx">
                                <div *ngIf="itemIdx < 1" class="body">{{item.insert | slice:0:75}}...</div>
                            </div>
                        </div>
                    </div>
                </nz-card>
            </div>
        </div>
    </section>
    `
})
export class DynMessagingListComponent {

    @Input() data: IMessages;

    sortOrder = 'recent';
    switchValue = false;

    constructor(
        private store: Store
    ) {
    }

    loadMsg(msg) {
        this.store.dispatch(new msgActions.GetMessage(msg.id));
    }

    clickSwitch() {
        this.store.dispatch(new msgActions.SetUnReadFilter(this.switchValue));
    }
}

import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { IMessage } from '../store/message.model';

@Component({
    selector: 'dyn-msg, [dyn-msg]',
    template: `
    <div class="msg">
        <div class="from">
            <div class="avatar">{{data.from | slice:0:1}}</div>
            <div class="name">{{data.from}}</div>
        </div>
        <quill-editor [(ngModel)]="data.body" format="object" readOnly="true" [modules]="modules"></quill-editor>
    </div>
    `
})
export class DynMessageComponent implements OnInit {

    @Input() data: IMessage;

    modules = {};

    constructor() {}

    ngOnInit() {
        this.modules = {
            toolbar: false,
        }
    }
}

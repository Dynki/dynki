import { Component, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'dyn-pre-auth',
    templateUrl: './dyn-pre-auth.component.html',
    animations: [
        trigger('bgImgTrigger', [
            state('none, void', style({
                opacity: '0'
            })),
            state('maximum', style({
                opacity: '1'
            })),
            transition('none => maximum', animate('200ms 1.5s'))
        ])
    ]
})
export class PreAuthComponent implements AfterViewInit {
    state = 'none';

    constructor() {}

    ngAfterViewInit() {
        this.state = 'maximum';
    }
}

import { Component, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'dyn-domain-choice',
    animations: [
        trigger('bgImgTrigger', [
            state('none, void', style({
                opacity: '0'
            })),
            state('maximum', style({
                opacity: '1'
            })),
            transition('none => maximum', animate('200ms'))
        ])
    ],
    template: `
    <div class="domain__choice">
        <div class="brand">
            <div class="section__img"></div>
            <h1>Dynki</h1>
        </div>

        <section class="section">
            <div class="main__form">
                <button class="domain__btn" nz-button [nzSize]="'Large'" nzType="dashed" [@bgImgTrigger]='state'>
                Create New Domain<i nz-icon type="plus-circle" theme="outline"></i>
                </button>
                <div class="or" [@bgImgTrigger]='state'>Or</div>
                <button class="domain__btn" nz-button [nzSize]="'Large'" nzType="dashed" [@bgImgTrigger]='state'>
                Join Existing Domain<i nz-icon type="enter" theme="outline"></i>
                </button>
            </div>
            <div class="main__pic"></div>
        </section>
    </div>`
})
export class DomainChoiceComponent implements AfterViewInit {
    state = 'none';

    constructor() {}

    ngAfterViewInit() {
        this.state = 'maximum';
    }
}

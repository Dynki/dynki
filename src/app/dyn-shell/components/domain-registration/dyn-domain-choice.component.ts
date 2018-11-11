import { Component, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'dyn-domain-choice',
    animations: [
        trigger('domainTrigger', [
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
    <div class="domain_form">
        <h1 class="registration__heading">Decisions Decisions!</h1>
        <button class="domain__btn" nz-button [nzSize]="'Large'" nzType="dashed" >
            Create New Domain<i nz-icon type="plus-circle" theme="outline"></i>
        </button>
        <div class="or">Or</div>
        <button class="domain__btn" nz-button [nzSize]="'Large'" nzType="dashed">
            Join Existing Domain<i nz-icon type="team" theme="outline"></i>
        </button>
    </div>`
})
export class DomainChoiceComponent implements AfterViewInit {
    state = 'none';

    constructor() {}

    ngAfterViewInit() {
        this.state = 'maximum';
    }
}

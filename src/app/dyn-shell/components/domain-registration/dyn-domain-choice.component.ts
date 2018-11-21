import { Component, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

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
        <button (click)="newDomain()" class="domain__btn" nz-button [nzSize]="'Large'" nzType="dashed" >
            Create New Domain<i nz-icon type="plus-circle" theme="outline"></i>
        </button>
    </div>`
})
export class DomainChoiceComponent implements AfterViewInit {
    state = 'none';

    constructor(private store: Store) {}

    ngAfterViewInit() {
        this.state = 'maximum';
    }

    newDomain() {
        this.store.dispatch(new Navigate(['/domain-registration/new']));
    }
}

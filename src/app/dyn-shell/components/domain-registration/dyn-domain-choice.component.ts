import { Component } from '@angular/core';

@Component({
    selector: 'dyn-domain-choice',
    template: `
    <div class="domain__choice">
        <div class="brand">
            <div class="section__img"></div>
            <h1>Dynki</h1>
        </div>

        <section class="section">
            <div class="main__form">
                <button class="domain__btn" nz-button [nzSize]="'Large'" nzType="dashed">
                Create New Domain<i nz-icon type="plus-circle" theme="outline"></i>
                </button>
                <div class="or">Or</div>
                <button class="domain__btn" nz-button [nzSize]="'Large'" nzType="dashed">
                Join Existing Domain<i nz-icon type="enter" theme="outline"></i>
                </button>
            </div>
            <div class="main__pic"></div>
        </section>
    </div>`
})
export class DomainChoiceComponent {

    constructor() { }
}

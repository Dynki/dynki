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
                <div class="new">Create new domain</div>
                <div class="or">Or</div>
                <div class="join">Join existing domain</div>
            </div>
            <div class="main__pic"></div>
        </section>
    </div>`
})
export class DomainChoiceComponent {

    constructor() { }
}

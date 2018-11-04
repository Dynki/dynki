import { Component } from '@angular/core';

@Component({
    selector: 'dyn-domain-choice',
    template: `
    <div class="domain__choice">

        <section class="section">
            <div class="domain__container">
                <div class="brand">
                    <div class="section__img"></div>
                    <h1>Dynki</h1>
                </div>
            </div>
            </section>
        <div class="pic"></div>
    </div>`
})
export class DomainChoiceComponent {

  constructor() { }
}

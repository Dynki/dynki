import { Component } from '@angular/core';

@Component({
    selector: 'dyn-domain-reg',
    template: `
    <div class="domain__choice">
    <div class="brand">
        <div class="section__img"></div>
        <h1>Dynki</h1>
    </div>

    <section class="section">
        <div class="main__form">
          <router-outlet></router-outlet>
        </div>
        <div class="main__pic"></div>
    </section>
    </div>`
})
export class DomainRegistrationComponent {

  constructor() { }
}

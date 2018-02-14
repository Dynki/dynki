import { Component } from '@angular/core';

@Component({
    selector: 'dyn-footer',
    templateUrl: './dyn-footer.component.html'
})

export class FooterComponent {

    constructor() {
    }

    about() {
        console.log('FooterComponent::about - not implemented yet!');
    }

    terms() {
        console.log('FooterComponent::about - not implemented yet!');
    }
}

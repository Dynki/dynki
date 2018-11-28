import { Component, Input } from '@angular/core';

@Component({
    selector: 'dyn-team-heading, [dyn-team-heading]',
    template: `
        <h1 class="heading">Team - {{name}}</h1>
    `
})

export class TeamHeadingComponent {

    @Input() name: string;

    constructor() { }
}

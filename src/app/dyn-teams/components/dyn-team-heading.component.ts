import { Component, Input } from '@angular/core';

@Component({
    selector: 'dyn-team-heading, [dyn-team-heading]',
    template: `
    <div class="team-heading">
        <h1 class="heading">Team - {{name}}</h1>
        <button class="invite-btn"
        nz-tooltip nzTitle="Coming soon"
         nz-button nzType="default"><i nz-icon type="smile"></i>Invite Members</button>
    </div>
    `
})

export class TeamHeadingComponent {

    @Input() name: string;

    constructor() { }
}

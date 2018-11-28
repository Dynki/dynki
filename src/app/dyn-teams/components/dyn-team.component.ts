import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { BaseState } from 'app/dyn-base/store/base.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'dyn-teams',
    template: `
    <div class="team">
        <section *ngIf="domainName$ | async as name" dyn-team-heading [name]="name"></section>
    </div>
    `
})

export class TeamComponent {

    @Select(BaseState.domainName)
    public domainName$: Observable<string>;

    constructor() { }
}

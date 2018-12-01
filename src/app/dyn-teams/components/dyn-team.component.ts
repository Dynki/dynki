import { Component, AfterViewInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BaseState } from 'app/dyn-base/store/base.state';
import { Observable } from 'rxjs';
import { ShellState } from 'app/dyn-shell/store/shell.state';
import * as shellActions from '../../dyn-shell/store/shell.actions';

@Component({
    selector: 'dyn-teams',
    template: `
    <div class="team">
        <section *ngIf="domainName$ | async as name" dyn-team-heading [name]="name"></section>
        <section *ngIf="member$ | async as members" dyn-team-members [members]="members"></section>
    </div>
    `
})

export class TeamComponent implements AfterViewInit {

    @Select(BaseState.domainName)
    public domainName$: Observable<string>;

    @Select(ShellState.domainMembers)
    public member$: Observable<any>;

    constructor(
        private store: Store
    ) { }

    ngAfterViewInit() {
        this.store.dispatch(new shellActions.GetDomainMembers());
    }
}

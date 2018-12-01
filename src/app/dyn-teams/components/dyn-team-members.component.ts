import { Component, Input } from '@angular/core';

@Component({
    selector: 'dyn-team-members, [dyn-team-members]',
    template: `
    <nz-table #membersTable [nzData]="members">
        <thead>
        <tr>
            <th>User</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let data of membersTable.data">
            <td>{{data.email}}</td>
        </tr>
        </tbody>
    </nz-table>
  `
})

export class TeamMembersComponent {

    @Input() members: any;

    constructor() { }
}

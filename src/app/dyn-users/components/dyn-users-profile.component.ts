import { Component, Input } from '@angular/core';
import { UserInfo } from 'firebase';

@Component({
    selector: 'dyn-userprofile, [dyn-userprofile]',
    template: `
    <div class="profile">
        {{user.displayName}}
    </div>
    `
})
export class DynUserProfileComponent {

    @Input() user: UserInfo;

    constructor() {}
}

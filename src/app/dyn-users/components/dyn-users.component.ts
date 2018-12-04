import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from 'app/dyn-auth/store/auth.state';
import { UserInfo } from 'firebase';

@Component({
    selector: 'dyn-user',
    template: `
    <section class="user">
        <section class="profile" dyn-userprofile *ngIf="user$ | async as user" [user]="user"></section>
    </section>
    `
})
export class DynUserComponent {

    @Select(AuthState.getUser)
    user$: Observable<UserInfo>;

    constructor(
        private store: Store
    ) { }
}

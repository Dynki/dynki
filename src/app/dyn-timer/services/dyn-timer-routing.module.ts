import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimerComponent } from '../components';
import { AuthenticatedGuard } from '../../dyn-auth/store/authenticated.guard';

const appRoutes: Routes = [
    {
        path: 'teams',
        component: TimerComponent,
        canActivate: [AuthenticatedGuard],
    }
];

// other imports
@NgModule({
    imports: [
        RouterModule.forChild(appRoutes),
    ],
    exports: [
        RouterModule,
    ],
    providers: [AuthenticatedGuard],
})
export class TimerRoutingModule { }


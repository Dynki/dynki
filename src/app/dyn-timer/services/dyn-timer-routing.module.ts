import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../dyn-auth/services';
import { TimerComponent } from '../components';

const appRoutes: Routes = [
    {
        path: 'teams',
        component: TimerComponent,
        canActivate: [AuthGuard],
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
    providers: [AuthGuard],
})
export class TimerRoutingModule { }


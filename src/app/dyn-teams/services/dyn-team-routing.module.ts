import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../dyn-auth/services';
import { TeamComponent, TeamDetailComponent } from '../../dyn-teams/components';

const appRoutes: Routes = [
    {
        path: 'teams',
        component: TeamComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Teams', parents: [] }
    },
    {
        path: 'teams/:id',
        canActivate: [AuthGuard],
        component: TeamDetailComponent,
        data: { breadcrumb: 'selected team', parents: ['teams'] }
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
export class TeamRoutingModule {
}

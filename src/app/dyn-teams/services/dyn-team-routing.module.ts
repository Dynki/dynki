import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedGuard } from '../../dyn-auth/store/authenticated.guard';
import { TeamComponent, TeamDetailComponent } from '../../dyn-teams/components';

const appRoutes: Routes = [
    {
        path: 'teams',
        component: TeamComponent,
        canActivate: [AuthenticatedGuard],
        data: { breadcrumb: 'Teams', parents: [] }
    },
    {
        path: 'teams/:id',
        canActivate: [AuthenticatedGuard],
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
    providers: [AuthenticatedGuard],
})
export class TeamRoutingModule {
}

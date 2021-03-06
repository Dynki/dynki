import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedGuard } from '../../dyn-auth/store/authenticated.guard';

import { HomeComponent, PostAuthComponent, PreAuthComponent } from '../components';
import { LoginComponent, SignupComponent } from '../../dyn-auth/components';
import { DynBoardComponent } from '../../dyn-boards/components/dyn-board.component';
import { DomainRegistrationComponent } from '../components/domain-registration/dyn-domain-reg.component';
import { NewDomainComponent } from '../components/domain-registration/dyn-new-domain.component';
import { JoinDomainComponent } from '../components/domain-registration/dyn-join-domain.component';
import { DomainChoiceComponent } from '../components/domain-registration/dyn-domain-choice.component';
import { DynMessagingComponent } from 'app/dyn-messaging/components/dyn-messaging.component';
import { TeamComponent } from 'app/dyn-teams/components';
import { DynUserComponent } from 'app/dyn-users/components/dyn-users.component';

const appRoutes: Routes = [
  {
    path: 'login', component: PreAuthComponent,
    children: [
      { path: 'login', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'auth', component: LoginComponent },
      { path: 'register', component: SignupComponent }
    ]
  },
  {
    path: 'domain-registration', component: DomainRegistrationComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      { path: 'choice', component: DomainChoiceComponent },
      { path: 'new', component: NewDomainComponent },
      { path: 'join', component: JoinDomainComponent }
    ]
  },
  {
    path: '', component: PostAuthComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      { path: '', redirectTo: 'messaging/inbox', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'team/users', component: TeamComponent },
      { path: 'user/profile', component: DynUserComponent },
      { path: 'board/:boardId', component: DynBoardComponent},
      { path: 'messaging/inbox', component: DynMessagingComponent }
    ]
  }

];

// other imports
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [AuthenticatedGuard],
})
export class ShellRoutingModule {
}

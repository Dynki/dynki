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
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'board/:boardId', component: DynBoardComponent}
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

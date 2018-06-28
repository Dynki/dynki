import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedGuard } from '../../dyn-auth/store/authenticated.guard';

import { HomeComponent, PostAuthComponent, PreAuthComponent } from '../components';
import { LoginComponent, SignupComponent } from '../../dyn-auth/components';

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
    path: '', component: PostAuthComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent }
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

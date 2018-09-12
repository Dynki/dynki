import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LoginComponent, SignupComponent } from './components';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticatedGuard } from './store/authenticated.guard';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth.state';

export const COMPONENTS = [LoginComponent, SignupComponent];

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    NgxsModule.forFeature([
      AuthState,
    ]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthRoutingModule,
      providers: [AuthenticatedGuard, AngularFireAuth]
    }
  }
}

const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent }
];

// other imports
@NgModule({
  imports: [
    AuthModule,
    NgZorroAntdModule,
    RouterModule.forChild(AUTH_ROUTES)
  ]
})
export class AuthRoutingModule { }

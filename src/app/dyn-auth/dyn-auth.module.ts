import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LoginComponent, SignupComponent, ConfirmComponent } from './components';
import { AuthGuard, AuthService, UserLoginService, CognitoUtil, UserRegistrationService } from './services';

import { AuthEffects } from './store/effects/auth.effect';
import { authReducers } from './store/reducers';

export const COMPONENTS = [LoginComponent, SignupComponent, ConfirmComponent];

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [UserLoginService, CognitoUtil, UserRegistrationService]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthRoutingModule,
      providers: [AuthGuard, AuthService]
    }
  }
}

const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'confirm', component: ConfirmComponent },
];

// other imports
@NgModule({
  imports: [
    AuthModule,
    // NgZorroAntdModule.forRoot(),
    RouterModule.forChild(AUTH_ROUTES),
    StoreModule.forFeature('auth', authReducers),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthRoutingModule { }

  import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LoginComponent, SignupComponent } from './components';

import { AuthEffects, RegisterEffects } from './store/effects';
import { authReducers } from './store/reducers';
import { AuthGuard } from 'app/dyn-auth/services';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppMaterialModule } from '../material.module';

export const COMPONENTS = [LoginComponent, SignupComponent];

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthRoutingModule,
      providers: [AuthGuard, AngularFireAuth]
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
    RouterModule.forChild(AUTH_ROUTES),
    StoreModule.forFeature('auth', authReducers),
    EffectsModule.forFeature([AuthEffects, RegisterEffects])
  ]
})
export class AuthRoutingModule { }

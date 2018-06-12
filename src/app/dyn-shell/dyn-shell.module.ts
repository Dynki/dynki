import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SidebarModule } from 'ng-sidebar';

import {
  FooterComponent,
  HomeComponent,
  PostAuthComponent,
  PreAuthComponent,
  ShellComponent,
  SideMenuComponent,
  ToolbarComponent,
} from './components';

import { ShellRoutingModule } from './services';
import { TruncatePipe } from './pipes';

import { AuthModule } from '../dyn-auth/dyn-auth.module';
import { TeamModule } from 'app/dyn-teams/dyn-team.module';

import { TimerModule } from 'app/dyn-timer/dyn-timer.module';

import { navReducers } from './store/reducers';
import { authReducers } from '../dyn-auth/store/reducers';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MdcAppBarModule, MdcIconModule, MdcIconToggleModule, MdcMenuModule } from '@angular-mdc/web';

// other imports
@NgModule({
  declarations: [
    PreAuthComponent,
    PostAuthComponent,
    FooterComponent,
    SideMenuComponent,
    ToolbarComponent,
    HomeComponent,
    TruncatePipe,
    ShellComponent
  ],
  imports: [
    StoreModule.forRoot({}),
    StoreModule.forFeature('nav', navReducers),
    EffectsModule.forRoot([]),
    AuthModule.forRoot(),
    SidebarModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    TimerModule,
    FlexLayoutModule,
    ShellRoutingModule,
    ReactiveFormsModule,
    MdcAppBarModule,
    MdcIconModule,
    MdcIconToggleModule,
    MdcMenuModule,
    NgZorroAntdModule.forRoot(),
  ],
  exports: [
    ToolbarComponent,
    HomeComponent,
    PreAuthComponent,
    PostAuthComponent,
    FooterComponent,
    SideMenuComponent,
    TeamModule,
    AuthModule,
    TruncatePipe,
    ShellComponent
  ],
  providers: []
})
export class ShellModule {
}

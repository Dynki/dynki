import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxsModule } from '@ngxs/store';

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
  ToolbarComponent
} from './components';

import { ShellRoutingModule } from './services';
import { TruncatePipe } from './pipes';

import { AuthModule } from '../dyn-auth/dyn-auth.module';
import { TeamModule } from '../dyn-teams/dyn-team.module';
import { TimerModule } from '../dyn-timer/dyn-timer.module';

import { AppMaterialModule } from '../material.module';
import { BoardModule } from '../dyn-boards/dyn-board.module';
import { MenuState } from '../dyn-base/store/menu.state';
import { BaseModule } from '../dyn-base/dyn-base.module';
import { BoardState } from '../dyn-boards/store/board.state';
import { ShellState } from './store/shell.state';

export const components = [
    FooterComponent,
    HomeComponent,
    PostAuthComponent,
    PreAuthComponent,
    ShellComponent,
    SideMenuComponent,
    ToolbarComponent
  ];

// other imports
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    ...components,
    TruncatePipe,
  ],
  imports: [
    AppMaterialModule,
    AuthModule.forRoot(),
    SidebarModule.forRoot(),
    NgxsModule.forRoot([
      ShellState,
      MenuState,
      BoardState
    ]),
    BaseModule,
    BoardModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    TimerModule,
    FlexLayoutModule,
    ShellRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
  ],
  exports: [
    ...components,
    BaseModule,
    BoardModule,
    TeamModule,
    AuthModule,
    TruncatePipe
  ],
  providers: []
})
export class ShellModule {
}

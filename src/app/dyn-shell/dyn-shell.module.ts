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
  MenuComponent,
  MenuItemComponent,
  SubMenuComponent,
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
import { MenuState } from './store/menu.state';
import { MenuService } from './services/dyn-menu.service';
import { MenuBuilder } from './services/dyn-menu.builder';

const components = [
    MenuComponent,
    MenuItemComponent,
    SubMenuComponent,
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
    components,
    TruncatePipe,
  ],
  imports: [
    AppMaterialModule,
    AuthModule.forRoot(),
    SidebarModule.forRoot(),
    NgxsModule.forFeature([
      MenuState
    ]),
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
    components,
    TeamModule,
    AuthModule,
    TruncatePipe
  ],
  providers: [
    MenuService,
    MenuBuilder
  ]
})
export class ShellModule {
}

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
import { BaseState } from 'app/dyn-base/store/base.state';
import { DomainChoiceComponent } from './components/domain-registration/dyn-domain-choice.component';
import { NewDomainComponent } from './components/domain-registration/dyn-new-domain.component';
import { JoinDomainComponent } from './components/domain-registration/dyn-join-domain.component';
import { DomainRegistrationComponent } from './components/domain-registration/dyn-domain-reg.component';
import { DomainService } from './services/dyn-domain.service';
import { MessagingModule } from 'app/dyn-messaging/dyn-messaging.module';
import { MessageState } from 'app/dyn-messaging/store/message.state';
import { UsersModule } from 'app/dyn-users/dyn-users.module';

export const components = [
    FooterComponent,
    HomeComponent,
    PostAuthComponent,
    PreAuthComponent,
    ShellComponent,
    SideMenuComponent,
    ToolbarComponent,
    DomainChoiceComponent,
    NewDomainComponent,
    JoinDomainComponent,
    DomainRegistrationComponent
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
      BoardState,
      BaseState,
      ShellState,
      MenuState,
      MessageState
    ]),
    BaseModule,
    BoardModule,
    MessagingModule,
    BrowserModule,
    UsersModule,
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
  providers: [
    DomainService
  ]
})
export class ShellModule {
}

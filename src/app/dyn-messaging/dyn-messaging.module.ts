import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AppMaterialModule } from '../material.module';
import { DynMessagingComponent } from './components/dyn-messaging.component';
import { DynInboxComponent } from './components/dyn-inbox.component';
import { DynMessagingListComponent } from './components/dyn-message-list.component';
import { MessagingService } from './services/dyn-messaging.service';
​
export const COMPONENTS = [DynMessagingComponent, DynInboxComponent, DynMessagingListComponent];

@NgModule({
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    AppMaterialModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [MessagingService]
})
export class MessagingModule {}


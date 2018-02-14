import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { TimerComponent } from './components';
import { TimerRoutingModule, TimerService } from './services';

// other imports
@NgModule({
  declarations: [
    TimerComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgZorroAntdModule,
    TimerRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    TimerComponent,
    TimerRoutingModule
  ],
  providers: [
      TimerService
  ],
})
export class TimerModule {
}

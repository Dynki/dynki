import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { TimerComponent } from './components';
import { TimerRoutingModule, TimerService } from './services';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store/reducers';

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
    ReactiveFormsModule,
    StoreModule.forFeature('timer', reducers),
    // EffectsModule.forFeature([AuthEffects, RegisterEffects])
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

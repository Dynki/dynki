import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DynUserComponent } from './components/dyn-users.component';
import { DynUserProfileComponent } from './components/dyn-users-profile.component';
​import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

export const COMPONENTS = [DynUserComponent, DynUserProfileComponent];

@NgModule({
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
      CommonModule,
      NgZorroAntdModule,
      FormsModule,
      ReactiveFormsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: []
})
export class UsersModule {}


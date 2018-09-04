import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import {
  MenuComponent,
  MenuItemComponent,
  SubMenuComponent,
  FolderItemComponent
} from './components';
import { MenuService } from './services/dyn-menu.service';
import { MenuState } from './store/menu.state';
import { MenuBuilder } from './services/dyn-menu.builder';
import { DragulaModule } from 'ng2-dragula';

export const COMPONENTS = [FolderItemComponent, MenuComponent, MenuItemComponent, SubMenuComponent];

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    DragulaModule.forRoot(),
    NgZorroAntdModule,
  ],
  declarations: [...COMPONENTS],
  exports: COMPONENTS,
  providers: [MenuService, MenuBuilder]
})
export class BaseModule {}


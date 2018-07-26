import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { MenuComponent, MenuItemComponent, SubMenuComponent } from '../dyn-shell/components';
import { MenuService } from './services/dyn-menu.service';
import { MenuState } from './store/menu.state';
import { MenuBuilder } from './services/dyn-menu.builder';

export const COMPONENTS = [MenuComponent, MenuItemComponent, SubMenuComponent];

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      MenuState
    ]),
    NgZorroAntdModule,
  ],
  declarations: [...COMPONENTS],
  exports: COMPONENTS,
  providers: [MenuService, MenuBuilder]
})
export class BaseModule {}


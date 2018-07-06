import { DynChooseBoardTypeComponent } from './components/dyn-choose-board.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BoardState } from './store/board.state';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DynMenuComponent } from './components/dyn-menu.component';
import { DynMenuItemComponent } from './components/dyn-menu-item.component';
import { DynSubMenuComponent } from './components/dyn-submenu.component';
import { CommonModule } from '@angular/common';

export const COMPONENTS = [
    DynChooseBoardTypeComponent,
    DynMenuComponent,
    DynMenuItemComponent,
    DynSubMenuComponent
];

@NgModule({
  entryComponents: [DynChooseBoardTypeComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      BoardState,
    ]),
    NgZorroAntdModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BoardModule {}


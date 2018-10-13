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
import { DynTableContainerComponent } from './components/table/dyn-container..component';
import { DynHeaderComponent } from './components/table/header/dyn-header.component';
import { DynRowComponent } from './components/table/row/dyn-row.component';
import { DynTableComponent } from './components/table/dyn-table.component';
import { DynCellComponent } from './components/table/column/dyn-cell.component';
import { DynNewRowComponent } from './components/table/row/dyn-new-row.component';
import { SortableDirective } from './directives/dyn-sortable.directive';

export const COMPONENTS = [
  FolderItemComponent,
  MenuComponent,
  MenuItemComponent,
  SubMenuComponent,
  DynTableContainerComponent,
  DynHeaderComponent,
  DynRowComponent,
  DynTableComponent,
  DynCellComponent,
  DynNewRowComponent
]

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    DragulaModule.forRoot(),
    NgZorroAntdModule,
  ],
  declarations: [...COMPONENTS, SortableDirective],
  exports: COMPONENTS,
  providers: [MenuService, MenuBuilder]
})
export class BaseModule {}


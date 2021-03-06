import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import {
  MenuComponent,
  MenuItemComponent,
  SubMenuComponent,
  FolderItemComponent
} from './components';
import { MenuService } from './services/dyn-menu.service';
import { MenuBuilder } from './services/dyn-menu.builder';
import { DragulaModule } from 'ng2-dragula';
import { DynTableContainerComponent } from './components/table/dyn-container..component';
import { DynHeaderComponent } from './components/table/header/dyn-header.component';
import { DynRowComponent } from './components/table/row/dyn-row.component';
import { DynTableComponent } from './components/table/dyn-table.component';
import { DynCellComponent } from './components/table/cell/dyn-cell.component';
import { DynNewRowComponent } from './components/table/row/dyn-new-row.component';
import { SortableDirective } from './directives/dyn-sortable.directive';
import { BaseService } from './services/base.service';
import { DynEditorComponent } from './components/editor/dyn-editor.component';
import { DynSelectComponent } from './components/table/cell/dyn-select.component';
import { DynSelectDirective } from './components/table/cell/dyn-select.directive';

import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { DynSelectCellComponent } from './components/table/cell/dyn-select-cell.component';
import { DynTextCellComponent } from './components/table/cell/dyn-text-cell.component';
import { DynCellDirective } from './components/table/cell/dyn-cell.directive';

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
  DynNewRowComponent,
  DynEditorComponent,
  DynSelectComponent,
  DynSelectCellComponent,
  DynTextCellComponent
]

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule,
    DragulaModule.forRoot(),
    NgZorroAntdModule
  ],
  declarations: [...COMPONENTS, SortableDirective, DynSelectDirective, DynCellDirective],
  exports: [...COMPONENTS, ReactiveFormsModule, FormsModule],
  providers: [BaseService, MenuService, MenuBuilder],
  entryComponents: [DynSelectComponent]
})
export class BaseModule {}


import { DynChooseBoardTypeComponent } from './components/dyn-choose-board.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { BoardService } from './services/board.service';
import { BaseModule } from '../dyn-base/dyn-base.module';
import { DynBoardComponent } from './components/dyn-board.component';
import { DynBoardDetailComponent } from './components/dyn-board-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AppMaterialModule } from '../material.module';
import { CellFactory } from './services/board-cell.factory';
import { DynTextCellComponent } from 'app/dyn-base/components/table/cell/dyn-text-cell.component';
import { DynSelectCellComponent } from 'app/dyn-base/components/table/cell/dyn-select-cell.component';
​
export const COMPONENTS = [DynChooseBoardTypeComponent, DynBoardComponent, DynBoardDetailComponent];

@NgModule({
  entryComponents: [DynChooseBoardTypeComponent, DynBoardDetailComponent, DynTextCellComponent, DynSelectCellComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BaseModule,
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    AppMaterialModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [BoardService, CellFactory]
})
export class BoardModule {}


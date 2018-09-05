import { DynChooseBoardTypeComponent } from './components/dyn-choose-board.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BoardState } from './store/board.state';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { BoardService } from './services/board.service';
import { BaseModule } from '../dyn-base/dyn-base.module';
import { DynBoardComponent } from './components/dyn-board.component';

export const COMPONENTS = [DynChooseBoardTypeComponent, DynBoardComponent];

@NgModule({
  entryComponents: [DynChooseBoardTypeComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BaseModule,
    CommonModule,
    NgZorroAntdModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [BoardService]
})
export class BoardModule {}


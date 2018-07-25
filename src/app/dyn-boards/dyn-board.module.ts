import { DynChooseBoardTypeComponent } from './components/dyn-choose-board.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BoardState } from './store/board.state';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { BoardService } from './services/board.service';

export const COMPONENTS = [DynChooseBoardTypeComponent];

@NgModule({
  entryComponents: [DynChooseBoardTypeComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      BoardState
    ]),
    NgZorroAntdModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [BoardService]
})
export class BoardModule {}


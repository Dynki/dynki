import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import * as boardActions from './board.actions';
import { BoardStateModel, IBoard } from './board.model';
import { NzModalService } from 'ng-zorro-antd';
import { DynChooseBoardTypeComponent } from '../components/dyn-choose-board.component';

@State<BoardStateModel>({
    name: 'board',
    defaults: {
        boards: []
    }
})
export class BoardState {

    /**
     * Selectors
     */
    @Selector()
    static getBoards(state: BoardStateModel): IBoard[] {
        return state.boards;
    }

    constructor(private store: Store, private modalService: NzModalService) { }

    /**
     * Commands
     */
    @Action(boardActions.ChooseBoardType)
    chooseBoardType(ctx: StateContext<BoardStateModel>) {
        console.log('Choose Board Type');
        this.modalService.create({
            nzTitle: 'Choose Template',
            nzContent: DynChooseBoardTypeComponent,
            nzFooter: null,
            nzWidth: '85%',
            nzBodyStyle: { height: '100%!important' },
            nzStyle: { position: 'absolute', height: '100%', top: '0px', right: '0px' },
            nzWrapClassName: 'dyn-modal-content'
        });
    }


}

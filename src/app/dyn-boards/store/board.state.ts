import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import * as boardActions from './board.actions';
import { BoardStateModel, IBoard } from './board.model';
import { NzModalService } from 'ng-zorro-antd';
import { DynChooseBoardTypeComponent } from '../components/dyn-choose-board.component';
import { BoardService } from '../services/board.service';
import * as menuActions from './menu.actions';

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

    constructor(
        private store: Store,
        private modalService: NzModalService,
        private boardService: BoardService
    ) { }

    /**
     * Commands
     */
    @Action(boardActions.ChooseBoardType)
    chooseBoardType(ctx: StateContext<BoardStateModel>) {
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

    @Action(boardActions.GetAllBoards)
    getAllBoards(ctx: StateContext<BoardStateModel>) {
        this.boardService.getBoards().subscribe(boards => {
            console.log('Board-state::Boards', boards);

            ctx.patchState({ boards });
            ctx.dispatch(new menuActions.LoadSubItems('Boards', boards.map(b => ({ title: b.description }))));
        });
    }

    /**
     * Events
     */
    @Action(boardActions.CreateBoard)
    createBoard(ctx: StateContext<BoardStateModel>, event: boardActions.CreateBoard) {
        this.modalService.closeAll();
        this.boardService.createBoard('scratch');
    }

}

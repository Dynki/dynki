import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import * as boardActions from './board.actions';
import { BoardStateModel, IBoard } from './board.model';
import { NzModalService } from 'ng-zorro-antd';
import { DynChooseBoardTypeComponent } from '../components/dyn-choose-board.component';
import { BoardService } from '../services/board.service';
import * as menuActions from '../../dyn-base/store/menu.actions';
import { MenuBuilder } from '../../dyn-base/services/dyn-menu.builder';

@State<BoardStateModel>({
    name: 'board',
    defaults: {
        boards: [],
        currentBoard: undefined
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
        private boardService: BoardService,
        private mb: MenuBuilder
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
            console.log('Board::State::getAllBoards::Subscribe');

            ctx.patchState({ boards: boards });
            ctx.dispatch(new menuActions.LoadSubItems('Boards',
                boards.map(b => {
                    return this.mb.setTitle(b.description)
                        .setClickAction(new boardActions.GetBoard(b.id))
                        .build();
            })));

            ctx.dispatch(new menuActions.LoadFolders('Main menu'))
        });
    }

    @Action(boardActions.GetBoard)
    getBoard(ctx: StateContext<BoardStateModel>, event: boardActions.GetBoard) {
        this.boardService.getBoard(event.boardId).valueChanges().subscribe(currentBoard => {
            console.log('Board::State::getAllBoards::Subscribe');

            ctx.patchState({ currentBoard: currentBoard });
        });
    }

    /**
     * Events
     */
    @Action(boardActions.CreateBoard)
    createBoard(ctx: StateContext<BoardStateModel>, event: boardActions.CreateBoard) {
        this.modalService.closeAll();
        this.boardService.createBoard(event.payload + ' 1');
    }

}

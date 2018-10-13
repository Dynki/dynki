import { Action, Selector, State, StateContext, Store, Actions } from '@ngxs/store';

import * as boardActions from './board.actions';
import { BoardStateModel, IBoard, IBoardEntity } from './board.model';
import { NzModalService } from 'ng-zorro-antd';
import { DynChooseBoardTypeComponent } from '../components/dyn-choose-board.component';
import { BoardService } from '../services/board.service';
import * as menuActions from '../../dyn-base/store/menu.actions';
import { MenuBuilder } from '../../dyn-base/services/dyn-menu.builder';
import { Navigate } from '@ngxs/router-plugin';

@State<BoardStateModel>({
    name: 'board',
    defaults: {
        boards: undefined,
        currentBoard: undefined,
        boardForm: {
            model: undefined,
            dirty: false,
            status: '',
            errors: {}
        }
    }
})
export class BoardState {

    /**
     * Selectors
     */
    @Selector()
    static getBoards(state: BoardStateModel): IBoard[] {
        return state.boards.boards;
    }

    @Selector()
    static getCurrentBoard(state: BoardStateModel): IBoard {
        return state.currentBoard;
    }

    @Selector()
    static getCurrentBoardEntities(state: BoardStateModel): IBoardEntity[] {
        return state.currentBoard.entities;
    }

    @Selector()
    static boardForm(state: BoardStateModel) {
        return state.boardForm;
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

    @Action(boardActions.UpdateBoard)
    updateBoard(ctx: StateContext<BoardStateModel>, event: boardActions.UpdateBoard) {
        this.boardService.updateBoard(event.board);
        ctx.dispatch(new boardActions.UpdateTitle(event.board));
    }

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
        this.boardService.getBoards().subscribe(app => {
            console.log('Board::State::getAllBoards::Subscribe');

            ctx.patchState({ boards: app[0] });

            if (app[0] && app[0].boards) {
                ctx.dispatch(new menuActions.LoadSubItems('Boards',
                    app[0].boards.map(b => {
                        return this.mb.setTitle(b.title)
                            .setClickAction(new boardActions.ViewBoard(b.id))
                            .build();
                })));
            }

            ctx.dispatch(new menuActions.LoadFolders('Main menu'))
        });
    }

    @Action(boardActions.GetBoard)
    getBoard(ctx: StateContext<BoardStateModel>, event: boardActions.GetBoard) {
        const state = ctx.getState();
        this.boardService.getBoard(event.boardId).subscribe(currentBoard => {
            console.log('Board::State::getAllBoards::Subscribe');

            ctx.patchState({ currentBoard: currentBoard, boardForm: {
                ...state.boardForm,
                model: currentBoard
            }});
        });
    }

    @Action(boardActions.ViewBoard)
    viewBoard(ctx: StateContext<BoardStateModel>, event: boardActions.ViewBoard) {
        ctx.dispatch(new Navigate(['/board/' + event.boardId ]));
    }

    @Action(boardActions.NewEntity)
    newEntity(ctx: StateContext<BoardStateModel>, event: boardActions.NewEntity) {
        const currentBoard = ctx.getState().currentBoard;
        const id = currentBoard.entities.length.toString();
        currentBoard.entities.push({ id, description: event.description });

        this.boardService.updateBoard(currentBoard);
        ctx.dispatch(new boardActions.UpdateTitle(currentBoard));
    }

    @Action(boardActions.UpdateEntity)
    updateEntity(ctx: StateContext<BoardStateModel>, event: boardActions.UpdateEntity) {
        const currentBoard = ctx.getState().currentBoard;
        const entityIndex = currentBoard.entities.findIndex(e => e.id === event.entity.id);
        currentBoard.entities[entityIndex] = event.entity;
        this.boardService.updateBoard(currentBoard);
    }

    @Action(boardActions.RemoveEntity)
    removeEntity(ctx: StateContext<BoardStateModel>, event: boardActions.RemoveEntity) {
        const currentBoard = ctx.getState().currentBoard;
        currentBoard.entities = currentBoard.entities.filter(e => e.id !== event.entity.id);
        this.boardService.updateBoard(currentBoard);
    }

    @Action(boardActions.UpdateColumn)
    updateColumn(ctx: StateContext<BoardStateModel>, event: boardActions.UpdateColumn) {
        const currentBoard = ctx.getState().currentBoard;
        const colIndex = currentBoard.columns.findIndex(c => c.model === event.column.model);
        currentBoard.columns[colIndex] = event.column;
        this.boardService.updateBoard(currentBoard);
    }

    @Action(boardActions.AddColumn)
    addColumn(ctx: StateContext<BoardStateModel>, event: boardActions.AddColumn) {
        const currentBoard = ctx.getState().currentBoard;

        currentBoard.columns.push({
                title: event.type,
                class: event.type,
                model: 'column' + currentBoard.columns.length
            });
        this.boardService.updateBoard(currentBoard);
    }

    @Action(boardActions.RemoveColumn)
    removeColumn(ctx: StateContext<BoardStateModel>, event: boardActions.RemoveColumn) {
        const currentBoard = ctx.getState().currentBoard;

        currentBoard.columns = currentBoard.columns.filter(c => c.model !== event.column.model);
        this.boardService.updateBoard(currentBoard);
    }

    @Action(boardActions.UpdateTitle)
    updateTitle(ctx: StateContext<BoardStateModel>, event: boardActions.UpdateTitle) {
        if (event.board) {
            let appBoards = ctx.getState().boards;
            let updatedBoard;
    
            if (appBoards && appBoards.boards.length > 0) {
                const idx = appBoards.boards.findIndex(b => b.id === event.board.id);
                appBoards.boards[idx].title = event.board.title;
            } else {
                updatedBoard = { id: event.board.id, title: event.board.title };
                appBoards = { boards: [updatedBoard] };
            }
            this.boardService.updateBoardTitle(appBoards);
        }
    }

    @Action(boardActions.UpdateBoards)
    updateBoards(ctx: StateContext<BoardStateModel>, event: boardActions.UpdateBoards) {
        this.boardService.updateBoards(event.boards);
    }

    /**
     * Events
     */
    @Action(boardActions.CreateBoard)
    createBoard(ctx: StateContext<BoardStateModel>, event: boardActions.CreateBoard) {
        this.modalService.closeAll();
        this.boardService.createBoard(event.payload + ' 1').then(docRef => {
            this.boardService.getBoard(docRef.id).subscribe(doc => ctx.dispatch(new boardActions.UpdateTitle(doc)));
        });
    }

    @Action(boardActions.RemoveBoard)
    removeBoard(ctx: StateContext<BoardStateModel>, event: boardActions.RemoveBoard) {
        console.log('Board::State::RemoveBoard', event.board);
        this.boardService.removeBoard(event.board);
    }
}

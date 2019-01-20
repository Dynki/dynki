import { Action, Selector, State, StateContext, Store, Actions } from '@ngxs/store';

import * as boardActions from './board.actions';
import { BoardStateModel, IBoard, IBoardEntity, IBoards } from './board.model';
import { NzModalService } from 'ng-zorro-antd';
import { DynChooseBoardTypeComponent } from '../components/dyn-choose-board.component';
import { BoardService } from '../services/board.service';
import * as menuActions from '../../dyn-base/store/menu.actions';
import { MenuBuilder } from '../../dyn-base/services/dyn-menu.builder';
import { Navigate } from '@ngxs/router-plugin';
import { take, tap } from 'rxjs/operators';
import { CellFactory } from '../services/board-cell.factory';

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
        private mb: MenuBuilder,
        private cellFactory: CellFactory
    ) { }

    /**
     * Commands
     */

    @Action(boardActions.SetCurrentBoard)
    setCurrentBoard(ctx: StateContext<BoardStateModel>, event: boardActions.UpdateBoard) {
        ctx.patchState({ currentBoard: event.board });
        ctx.dispatch(new boardActions.ViewBoard(event.board.id));
    }

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
        this.boardService.getBoards();
    }

    @Action(boardActions.RefreshBoards)
    refreshBoards(ctx: StateContext<BoardStateModel>, event: boardActions.RefreshBoards) {
        console.log('Board::State::RefreshBoards');

        let boards;
        if (event.boards) {
            ctx.patchState({ boards: event.boards });
            boards = event.boards.boards;
        } else {
            boards = ctx.getState().boards.boards;
        }

        if (boards) {
            ctx.dispatch(new menuActions.LoadSubItems('Boards',
            boards.map(b => {
                return this.mb.setTitle(b.title)
                    .setIsFolder(b.isFolder)
                    .setFoldersAllowed(b.isFolder)
                    .setClickAction(new boardActions.ViewBoard(b.id))
                    .build();

            })));
        }
    }

    @Action(boardActions.GetBoard)
    getBoard(ctx: StateContext<BoardStateModel>, event: boardActions.GetBoard) {
        const state = ctx.getState();
        this.boardService.getBoard(event.boardId);
    }


    @Action(boardActions.DisplayBoard)
    displayBoard(ctx: StateContext<BoardStateModel>, event: boardActions.DisplayBoard) {
        const state = ctx.getState();
        ctx.patchState({
            currentBoard: event.board, boardForm: {
                ...state.boardForm,
                model: event.board
            }
        });
    }

    @Action(boardActions.ViewBoard)
    viewBoard(ctx: StateContext<BoardStateModel>, event: boardActions.ViewBoard) {
        ctx.dispatch(new Navigate(['/board/' + event.boardId]));
    }

    @Action(boardActions.NewEntity)
    newEntity(ctx: StateContext<BoardStateModel>, event: boardActions.NewEntity) {
        const currentBoard = ctx.getState().currentBoard;
        const id = currentBoard.entities.length.toString();
        currentBoard.entities.push({ id, description: event.description });

        this.boardService.updateBoard(currentBoard);
        // ctx.dispatch(new boardActions.UpdateTitle(currentBoard));
    }

    @Action(boardActions.UpdateEntity)
    updateEntity(ctx: StateContext<BoardStateModel>, event: boardActions.UpdateEntity) {
        const currentBoard = ctx.getState().currentBoard;
        const entityIndex = currentBoard.entities.findIndex(e => e.id === event.entity.id);
        currentBoard.entities[entityIndex] = event.entity;
        this.boardService.updateBoard(currentBoard);
    }

    @Action(boardActions.UpdateEntities)
    updateEntities(ctx: StateContext<BoardStateModel>, event: boardActions.UpdateEntities) {
        const currentBoard = ctx.getState().currentBoard;
        currentBoard.entities = event.payload;
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

        const model = 'column' + currentBoard.columns.length;
        const newCell = JSON.parse(JSON.stringify(this.cellFactory.createCell(event.type, model, model)));
        currentBoard.columns.push(newCell);
        console.log('CurrentBoard::', currentBoard);
        this.boardService.updateBoard(currentBoard);
    }

    @Action(boardActions.RemoveColumn)
    removeColumn(ctx: StateContext<BoardStateModel>, event: boardActions.RemoveColumn) {
        const currentBoard = ctx.getState().currentBoard;

        currentBoard.columns = currentBoard.columns.filter(c => c.model !== event.column.model);
        this.boardService.updateBoard(currentBoard);
    }

    @Action(boardActions.CreateBoard)
    async createBoard(ctx: StateContext<BoardStateModel>, event: boardActions.CreateBoard) {
        this.modalService.closeAll();
        const newBoard = await this.boardService.createBoard(event.payload + ' 1')
        const boards = await this.boardService.attachBoard(newBoard).toPromise();
        ctx.dispatch(new boardActions.RefreshBoards(boards));
        ctx.dispatch(new boardActions.ViewBoard(newBoard.id));
    }

    @Action(boardActions.AttachBoard)
    AttachBoard(ctx: StateContext<BoardStateModel>, event: boardActions.AttachBoard) {
        this.boardService.attachBoard(event.board).pipe(
            take(1),
            tap((boards: IBoards) => ctx.dispatch(new boardActions.RefreshBoards(boards)))
        ).subscribe();
    }


    @Action(boardActions.UpdateTitle)
    updateTitle(ctx: StateContext<BoardStateModel>, event: boardActions.UpdateTitle) {
        if (event.board) {

            const boards = ctx.getState().boards;

            if (boards) {
                const boardIdx = boards.boards.findIndex(b => b.id === event.board.id);

                if (boardIdx !== -1) {
                    boards.boards[boardIdx].title = event.board.title;
                    ctx.patchState({ boards });
                    ctx.dispatch(new boardActions.RefreshBoards());
                }
            }

            this.boardService.updateBoardTitle(event.board).pipe(
                take(1)
            ).subscribe();
        }
    }

    @Action(boardActions.UpdateBoards)
    updateBoards(ctx: StateContext<BoardStateModel>, event: boardActions.UpdateBoards) {
        this.boardService.updateBoards(event.boards);
    }

    /**
     * Events
     */
    @Action(boardActions.AddFolder)
    addFolder(ctx: StateContext<BoardStateModel>) {
        this.boardService.AddBoardFolder(ctx.getState().boards);
    }

    @Action(boardActions.RemoveBoard)
    removeBoard(ctx: StateContext<BoardStateModel>, event: boardActions.RemoveBoard) {
        console.log('Board::State::RemoveBoard', event.board);
        this.boardService.removeBoard(event.board);
        ctx.dispatch(new boardActions.RefreshBoards());
    }
}

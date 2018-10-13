import { Board, IBoard, IBoardEntity, IBoardColumn } from './board.model';

export enum BoardActionTypes {
  CHOOSE_BOARD_TYPE  = '[Board] Choose Type',
  CREATE_BOARD       = '[Board] Create Board',
  UPDATE_BOARD       = '[Board] Update Board',
  REMOVE_BOARD       = '[Board] Remove Board',
  GET_BOARD          = '[Board] Get Board',
  GET_ALL_BOARDS     = '[Board] Get All Boards',
  GET_BOARD_TYPES    = '[Board] Get Board Types',
  VIEW_BOARD         = '[Board] View Board',
  NEW_ENTITY         = '[Board] New Entity',
  UPDATE_ENTITY      = '[Board] Update Entity',
  REMOVE_ENTITY      = '[Board] Remove Entity',
  ADD_COULMN         = '[Board] Add Colunn',
  REMOVE_COLUMN      = '[Board] Remove Column',
  UPDATE_COLUMN      = '[Board] Update Column',
  UPDATE_TITLE       = '[Board] Update Title',
  UPDATE_BOARDS      = '[Board] Update Boards'
};

export class UpdateBoards {
    static type = BoardActionTypes.UPDATE_TITLE;
    constructor(public boards: any[]) {}
}

export class UpdateTitle {
    static type = BoardActionTypes.UPDATE_TITLE;
    constructor(public board: Board) {}
}

export class AddColumn {
    static type = BoardActionTypes.ADD_COULMN;
    constructor(public type: string) { }
}

export class RemoveColumn {
    static type = BoardActionTypes.REMOVE_COLUMN;
    constructor(public column: IBoardColumn) { }
}

export class UpdateColumn {
    static type = BoardActionTypes.UPDATE_COLUMN;
    constructor(public column: IBoardColumn) { }
}

export class NewEntity {
    static type = BoardActionTypes.NEW_ENTITY;
    constructor(public description: string) {}
}

export class RemoveEntity {
    static type = BoardActionTypes.REMOVE_ENTITY;
    constructor(public entity: IBoardEntity) {}
}

export class UpdateEntity {
    static type = BoardActionTypes.UPDATE_ENTITY;
    constructor(public entity: IBoardEntity) {}
}

export class ChooseBoardType {
    static type = BoardActionTypes.CHOOSE_BOARD_TYPE;
    constructor() {}
}

export class CreateBoard {
    static type = BoardActionTypes.CREATE_BOARD;
    constructor(public payload: string) {}
}

export class GetAllBoards {
    static type = BoardActionTypes.GET_ALL_BOARDS
    constructor() {}
}

export class GetBoard {
    static type = BoardActionTypes.GET_BOARD
    constructor(public boardId: string) {}
}

export class ViewBoard {
    static type = BoardActionTypes.GET_BOARD
    constructor(public boardId: string) {}
}

export class UpdateBoard {
    static type = BoardActionTypes.UPDATE_BOARD
    constructor(public board: Board) {}
}

export class RemoveBoard {
    static type = BoardActionTypes.REMOVE_BOARD;
    constructor(public board: Board) {}
}

export type BoardActions =
    UpdateTitle     |
    AddColumn       |
    UpdateColumn    |
    ChooseBoardType |
    CreateBoard     |
    RemoveBoard     |
    GetAllBoards    |
    GetBoard        |
    ViewBoard       |
    UpdateBoard     |
    UpdateBoards;



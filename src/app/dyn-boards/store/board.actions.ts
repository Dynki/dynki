import { Board, IBoard, IBoardEntity, IBoardColumn, IBoards } from './board.model';

export enum BoardActionTypes {
  CHOOSE_BOARD_TYPE  = '[Board] Choose Type',
  CREATE_BOARD       = '[Board] Create Board',
  ATTACH_BOARD       = '[Board] Attach Board',
  UPDATE_BOARD       = '[Board] Update Board',
  REMOVE_BOARD       = '[Board] Remove Board',
  GET_BOARD          = '[Board] Get Board',
  DISPLAY_BOARD      = '[Board] Display Board',
  GET_ALL_BOARDS     = '[Board] Get All Boards',
  GET_BOARD_TYPES    = '[Board] Get Board Types',
  VIEW_BOARD         = '[Board] View Board',
  NEW_ENTITY         = '[Board] New Entity',
  UPDATE_ENTITY      = '[Board] Update Entity',
  UPDATE_ENTITIES    = '[Board] Update Entities',
  REMOVE_ENTITY      = '[Board] Remove Entity',
  ADD_COULMN         = '[Board] Add Colunn',
  REMOVE_COLUMN      = '[Board] Remove Column',
  UPDATE_COLUMN      = '[Board] Update Column',
  UPDATE_TITLE       = '[Board] Update Title',
  UPDATE_BOARDS      = '[Board] Update Boards',
  ADD_FOLDER         = '[Board] Add Folder',
  SET_CURRENT_BOARD  = '[Board] Set Current Board',
  REFRESH_BOARDS     = '[Board] Refresh Boards'
};

export class RefreshBoards {
    static type = BoardActionTypes.REFRESH_BOARDS;
    constructor(public boards?: IBoards) {}
}

export class AddFolder {
    static type = BoardActionTypes.ADD_FOLDER;
    constructor() {}
}

export class UpdateBoards {
    static type = BoardActionTypes.UPDATE_BOARDS;
    constructor(public boards: any[]) {}
}

export class UpdateTitle {
    static type = BoardActionTypes.UPDATE_TITLE;
    constructor(public board: Board) {}
}

export class DisplayBoard {
    static type = BoardActionTypes.DISPLAY_BOARD;
    constructor(public board: Board) {}
}

export class AttachBoard {
    static type = BoardActionTypes.ATTACH_BOARD;
    constructor(public board: Board) {}
}

export class SetCurrentBoard {
    static type = BoardActionTypes.SET_CURRENT_BOARD;
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

export class UpdateEntities {
    static type = BoardActionTypes.UPDATE_ENTITIES;
    constructor(public payload: IBoardEntity[]) {}
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
    UpdateEntities  |
    AddColumn       |
    UpdateColumn    |
    ChooseBoardType |
    CreateBoard     |
    AttachBoard     |
    SetCurrentBoard |
    RemoveBoard     |
    GetAllBoards    |
    GetBoard        |
    ViewBoard       |
    UpdateBoard     |
    UpdateBoards    |
    RefreshBoards   |
    AddFolder;



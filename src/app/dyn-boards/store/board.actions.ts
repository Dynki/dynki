export enum BoardActionTypes {
  CHOOSE_BOARD_TYPE  = '[Board] Choose Type',
  CREATE_BOARD       = '[Board] Create Board',
  UPDATE_BOARD       = '[Board] Update Board',
  DELETE_BOARD       = '[Board] Delete Board',
  GET_BOARD          = '[Board] Get Board',
  GET_ALL_BOARDS     = '[Board] Get All Boards',
  GET_BOARD_TYPES    = '[Board] Get Board Types'
};

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

export type BoardActions =
    ChooseBoardType |
    CreateBoard |
    GetAllBoards;


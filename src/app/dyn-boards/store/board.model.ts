import * as moment from 'moment';
import { UserInfo } from 'firebase';

export type BoardType = 'Timer' | 'Task' | 'Project'

export class BaseClass {
    user: string;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
}

export class IBoards {
    id?: string;
    boards: Array<IBoard>;
}

export interface IBoard extends BaseClass {
    id: string;
    title: string;
    isFolder?: boolean;
    description: string;
    type: BoardType;
    entities: Array<IBoardEntity>;
    columns: Array<IBoardColumn>;
}

export class IBoardColumn {
    title: string;
    class: string;
    model: string;
}

export interface IBoardEntity {
    id: string;
    [id: string]: any;
}

export interface BoardStateModel {
    boards: IBoards;
    currentBoard: IBoard;
    boardForm: {
        model: any;
        dirty: boolean;
        status: string;
        errors: Object;
    }
}

export class Board implements IBoard {
    id: string;
    title: string;
    description: string;
    type: BoardType;
    entities: IBoardEntity[];
    columns: IBoardColumn[];
    user: string;
    isFolder?: boolean;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;

    constructor(type: BoardType, title: string, description: string, userInfo: UserInfo) {
        this.createdBy = userInfo.uid;
        this.createdDate = moment().toDate();
        this.description = description;
        this.title = title;
        this.isFolder = false;
        this.entities = [];
        this.columns = [{ title: 'Description', model: 'description', class: 'text' }];
        this.type = type;
    }
}

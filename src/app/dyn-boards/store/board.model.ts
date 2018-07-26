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

export interface IBoard extends BaseClass {
    id: string;
    description: string;
    type: BoardType;
    entities: Array<IBoardEntity>;
}

export interface IBoardEntity {
    [id: string]: any;
}

export interface BoardStateModel {
    boards: Array<IBoard>;
}

export class Board implements IBoard {
    id: string;
    description: string;
    type: BoardType;
    entities: IBoardEntity[];
    user: string;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;

    constructor(type: BoardType, description: string, userInfo: UserInfo) {
        this.createdBy = userInfo.uid;
        this.createdDate = moment().toDate();
        this.description = description;
        this.entities = [];
        this.type = type;
    }
}

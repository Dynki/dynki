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

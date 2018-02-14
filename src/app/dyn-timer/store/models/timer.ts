export class BaseClass {
    user: string;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
}

export interface TimeEntry extends BaseClass {
    _id: string;
    description: string;
    start: Date;
    stop: Date;
    duration: number;
    projects: Array<string>;
    tags: Array<string>;
}

export class BaseClass {
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
}

export interface Team extends BaseClass {
    _id: string;
    name: string;
    members: Array<TeamMember>;
}

export interface TeamMember extends BaseClass {
    _id: string;
    user_id: string;
    email: string;
    admin: boolean;
}

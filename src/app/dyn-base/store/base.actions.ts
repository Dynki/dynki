export enum BaseActionTypes {
    GET_USER_DOMAIN = '[Base] Get user domain'
};

export class GetUserDomain {
    static type = BaseActionTypes.GET_USER_DOMAIN;
    constructor() { }
}

export type BaseActions =
    GetUserDomain;

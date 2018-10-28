export enum BaseActionTypes {
    GET_USER_DOMAIN = '[Base] Get user domain',
    DOMAIN_LOADED = '[Base] Domain loaded'
};

export class GetUserDomain {
    static type = BaseActionTypes.GET_USER_DOMAIN;
    constructor() { }
}

export class DomainLoaded {
    static type = BaseActionTypes.DOMAIN_LOADED;
    constructor() { }
}

export type BaseActions =
    DomainLoaded |
    GetUserDomain;

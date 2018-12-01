export enum ShellActionTypes {
    CHECK_DOMAIN_NAME   = '[Shell] Check Domain Name',
    DOMAIN_NAME_EXISTS  = '[Shell] Domain Name Exists',
    DOMAIN_NAME_UNIQUE  = '[Shell] Domain Name Unique',
    CREATE_DOMAIN       = '[Shell] Create Domain',
    DOMAIN_CREATED      = '[Shell] Domain Created',
    GET_DOMAIN_MEMBERS  = '[Shell] Get Domain Members',
    REFRESH_DOMAIN_MEMBERS  = '[Shell] Refrehs Domain Members'
}

export class GetDomainMembers {
    static type = ShellActionTypes.GET_DOMAIN_MEMBERS;
    constructor() { }
}

export class RefreshDomainMembers {
    static type = ShellActionTypes.REFRESH_DOMAIN_MEMBERS;
    constructor(public members: any) { }
}

export class CreateDomain {
    static type = ShellActionTypes.CREATE_DOMAIN;
    constructor(public name: string) { }
}

export class DomainCreated {
    static type = ShellActionTypes.DOMAIN_CREATED;
    constructor(public domainId: string) { }
}

export class CheckDomainName {
    static type = ShellActionTypes.CHECK_DOMAIN_NAME;
    constructor(public name: string) { }
}

export class DomainNameExists {
    static type = ShellActionTypes.DOMAIN_NAME_EXISTS;
    constructor() { }
}

export class DomainNameUnique {
    static type = ShellActionTypes.DOMAIN_NAME_UNIQUE;
    constructor() { }
}

export type DomainActions =
    GetDomainMembers |
    RefreshDomainMembers |
    CreateDomain     |
    DomainNameExists |
    DomainNameUnique |
    CheckDomainName;

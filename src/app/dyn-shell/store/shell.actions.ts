export enum ShellActionTypes {
    CHECK_DOMAIN_NAME = '[Shell] Check Domain Name',
    DOMAIN_NAME_EXISTS = '[Shell] Domain Name Exists',
    DOMAIN_NAME_UNIQUE = '[Shell] Domain Name Unique'
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
    DomainNameExists |
    DomainNameUnique |
    CheckDomainName;

export enum ShellActionTypes {
  CHECK_DOMAIN_NAME     = '[Shell] Check Domain Name'
}

export class CheckDomainName {
  static type = ShellActionTypes.CHECK_DOMAIN_NAME;
  constructor(public name: string) {}
}

export type DomainActions =
  CheckDomainName;

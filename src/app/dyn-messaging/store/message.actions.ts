import { IMessages } from './message.model';

export enum MessageActionTypes {
  GET_MESSAGES      = '[Messaging] Get Messages',
  GET_MESSAGE       = '[Messaging] Get Message',
  REFRESH_MESSAGES  = '[Messaging] Refresh Messages'
};

export class GetMessages {
    static type = MessageActionTypes.GET_MESSAGES;
    constructor() {}
}

export class RefreshMessages {
    static type = MessageActionTypes.REFRESH_MESSAGES;
    constructor(public messages: IMessages) {}
}

export class GetMessage {
    static type = MessageActionTypes.GET_MESSAGE;
    constructor(public messageId: string) {}
}

export type MessageActions =
    GetMessage  |
    GetMessages;


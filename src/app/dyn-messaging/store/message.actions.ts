import { IMessages, IMessage } from './message.model';

export enum MessageActionTypes {
  GET_MESSAGES      = '[Messaging] Get Messages',
  GET_MESSAGE       = '[Messaging] Get Message',
  REFRESH_MESSAGES  = '[Messaging] Refresh Messages',
  SET_CURRENT_MESSAGE = '[Messaging] Set Current Message',
  SET_UNREAD_FILTER = '[Messaging] Set Unread Filter',
  SELECT_FIRST_MSG  = '[Messaging] Select First Message'
};

export class SelectFirstMsg {
    static type = MessageActionTypes.SELECT_FIRST_MSG;
    constructor(public firstUnreadMsg = false) {}
}

export class SetUnReadFilter {
    static type = MessageActionTypes.SET_UNREAD_FILTER;
    constructor(public payload: boolean) {}
}

export class GetMessages {
    static type = MessageActionTypes.GET_MESSAGES;
    constructor() {}
}

export class SetCurrentMessage {
    static type = MessageActionTypes.SET_CURRENT_MESSAGE;
    constructor(public msg: IMessage) {}
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
    SelectFirstMsg      |
    SetUnReadFilter     |
    RefreshMessages     |
    SetCurrentMessage   |
    GetMessage          |
    GetMessages;


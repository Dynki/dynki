import * as moment from 'moment';
import { UserInfo } from 'firebase';

export interface IMessage {
    id: string;
    from: string;
    to: Array<string>;
    subject: string;
    body: string;
    sent: boolean;
    created: Date;
    author: string;
    status: string;
    read: boolean;
}

export class IMessages {
    messages: Array<IMessage>;
}

export interface MessageStateModel {
    messages: IMessages;
    currentMsg: IMessage;
}

export class Message implements IMessage {
    id: string;
    author: string;
    created: Date;
    from: string;
    to: Array<string>;
    subject: string;
    body: string;
    sent: boolean;
    read: boolean;
    status: string;

    constructor(subject: string, to: Array<string>, body: string, userInfo: UserInfo) {
        this.author = userInfo.uid;
        this.created = moment().toDate();
        this.from = userInfo.displayName;
        this.to = to;
        this.subject = subject;
        this.body = body;
        this.sent = false;
        this.status = 'Draft';
        this.read = false;
    }
}

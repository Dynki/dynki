import { Action, Selector, State, StateContext, Store, Actions } from '@ngxs/store';

import { MessageStateModel, IMessages, IMessage } from './message.model';
import * as messagActions from '../store/message.actions';
import { MessagingService } from '../services/dyn-messaging.service';

@State<MessageStateModel>({
    name: 'message',
    defaults: {
        messages: undefined,
        sortOrder: undefined,
        unReadOnly: false,
        currentMsg: {
            id: undefined,
            from: undefined,
            to: undefined,
            subject: undefined,
            sent: false,
            created: undefined,
            author: undefined,
            read: undefined,
            reading: undefined,
            status: undefined,
            selected: false,
            body: {
                ops: []
            }
        },
    }
})
export class MessageState {

    /**
     * Selectors
     */
    @Selector()
    static getMessages(state: MessageStateModel): IMessage[] {
        return state.messages.messages;
    }

    @Selector()
    static getCurrentMsg(state: MessageStateModel): IMessage {
        return state.currentMsg;
    }

    @Selector()
    static unReadOnly(state: MessageStateModel): boolean {
        return state.unReadOnly;
    }

    constructor(
        private store: Store,
        private msgService: MessagingService
    ) { }

    /**
     * Commands
     */
    @Action(messagActions.GetMessages)
    getMessages(ctx: StateContext<MessageStateModel>, event: messagActions.GetMessages) {
        console.log('Message::State:GetMessages');
        this.msgService.getMessages();
    }

    @Action(messagActions.GetMessage)
    getMessage(ctx: StateContext<MessageStateModel>, event: messagActions.GetMessage) {
        console.log('Message::State:GetMessage');
        this.msgService.getMessage(event.messageId);
    }

    @Action(messagActions.SelectFirstMsg)
    selectFirstMessage(ctx: StateContext<MessageStateModel>, event: messagActions.SelectFirstMsg) {
        console.log('Message::State:SelectFirstMessage');
        const msgs = ctx.getState().messages;
        if (msgs.messages.length > 0) {
            const msgIdx = (event.firstUnreadMsg && msgs.messages.findIndex(m => !m.read))
                ? msgs.messages.findIndex(m => !m.read)
                : 0;

            const msg = msgs.messages[msgIdx].selected = true;

            ctx.patchState({ messages: msgs });
            ctx.dispatch(new messagActions.GetMessage(msgs.messages[msgIdx].id));
        }
    }

    /**
     * Events
     */
    @Action(messagActions.RefreshMessages)
    refreshMessages(ctx: StateContext<MessageStateModel>, event: messagActions.RefreshMessages) {
        ctx.patchState({ messages: event.messages });
        ctx.dispatch(new messagActions.SelectFirstMsg());
    }

    @Action(messagActions.SetCurrentMessage)
    setCurrentMessage(ctx: StateContext<MessageStateModel>, event: messagActions.SetCurrentMessage) {
        const state = ctx.getState();
        state.messages.messages.map(m => {
            m.selected = m.id === event.msg.id ? true : false;
            if (m.id === event.msg.id) {
                if (state.unReadOnly) {
                    m.reading = true;
                } else {
                    m.read = true;
                }
            }
            return m;
        })
        ctx.patchState({ messages: state.messages, currentMsg: event.msg });
    }

    @Action(messagActions.SetMsgsRead)
    setMsgsRead(ctx: StateContext<MessageStateModel>, event: messagActions.SetMsgsRead) {
        const state = ctx.getState();
        state.messages.messages.map(m => {
            if (m.reading) {
                m.reading = false;
                m.read = true;
            }
            return m;
        })
        ctx.patchState({ messages: state.messages });
    }

    @Action(messagActions.SetUnReadFilter)
    setUnReadFilter(ctx: StateContext<MessageStateModel>, event: messagActions.SetUnReadFilter) {
        ctx.patchState({ unReadOnly: event.payload });
        ctx.dispatch(new messagActions.SetMsgsRead());
        ctx.dispatch(new messagActions.SelectFirstMsg());
    }
}

import { Action, Selector, State, StateContext, Store, Actions } from '@ngxs/store';

import { MessageStateModel, IMessages, IMessage } from './message.model';
import * as messagActions from '../store/message.actions';
import { MessagingService } from '../services/dyn-messaging.service';

@State<MessageStateModel>({
    name: 'message',
    defaults: {
        messages: undefined,
        currentMsg: undefined,
    }
})
export class MessageState {

    /**
     * Selectors
     */
    @Selector()
    static getMessages(state: MessageStateModel): IMessages {
        return state.messages;
    }

    @Selector()
    static getCurrentMsg(state: MessageStateModel): IMessage {
        return state.currentMsg;
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

    /**
     * Events
     */
    @Action(messagActions.RefreshMessages)
    refreshMessages(ctx: StateContext<MessageStateModel>, event: messagActions.RefreshMessages) {
        ctx.patchState({ messages: event.messages });
    }
}

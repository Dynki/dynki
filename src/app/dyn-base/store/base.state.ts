import { Action, Selector, State, StateContext, createSelector } from '@ngxs/store';

import * as baseActions from './base.actions';
import { BaseStateModel } from './base.model';
import { BaseService } from '../services/base.service';

@State<BaseStateModel>({
    name: 'base',
    defaults: {
        domainId: undefined
    }
})
export class BaseState {

    /**
     * Selectors
     */
    @Selector() static domainId(state: BaseStateModel): string {
        return state.domainId;
    }

    constructor(
        private baseService: BaseService
    ) {}

    /**
     * Commands
     */
    @Action(baseActions.GetUserDomain)
    getUserDomain(ctx: StateContext<BaseStateModel>) {
        this.baseService.getUserDomain().then(domainId => {
            console.log('DomainId::', domainId);
            ctx.patchState({ domainId })
        });
    }


    /**
     * Events
     */
}

import { Action, Selector, State, StateContext, createSelector } from '@ngxs/store';

import * as baseActions from './base.actions';
import { BaseStateModel } from './base.model';
import { BaseService } from '../services/base.service';
import { take, tap } from 'rxjs/operators';

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
        this.baseService.getUserDomain().pipe(
            tap(domain => {
                console.log('DomainId::', domain.id);
                ctx.patchState({ domainId: domain.id })
                ctx.dispatch(new baseActions.DomainLoaded());
            })
        );
    }

    /**
     * Events
     */
}

import { Action, Selector, State, StateContext, createSelector } from '@ngxs/store';

import * as baseActions from './base.actions';
import { BaseStateModel } from './base.model';
import { BaseService } from '../services/base.service';
import { take, tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

@State<BaseStateModel>({
    name: 'base',
    defaults: {
        domainId: undefined,
        domainName: ''
    }
})
export class BaseState {

    /**
     * Selectors
     */
    @Selector() static domainId(state: BaseStateModel): string {
        return state.domainId;
    }

    @Selector() static domainName(state: BaseStateModel): string {
        return state.domainName;
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
            take(1),
        ).
        subscribe(domain => {
            if (domain) {
                console.log('DomainId::', domain.id);
                ctx.patchState({ domainId: domain.id, domainName: domain.display_name });
                ctx.dispatch(new baseActions.DomainLoaded());
            } else {
                console.log('Domain Id::Undefined');
                ctx.dispatch(new baseActions.NoUserDomain());
            }
        },
        (error) => {
            console.log('Domain Id::Error::', error);
            ctx.dispatch(new baseActions.NoUserDomain());
        });
    }

    @Action(baseActions.NoUserDomain)
    noUserDomain(ctx: StateContext<BaseStateModel>) {
        ctx.dispatch(new Navigate(['/domain-registration/choice']))
    }
    /**
     * Events
     */
}

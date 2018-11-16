import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ShellStateModel } from './shell.model';
import { MenuState } from '../../dyn-base/store/menu.state';
import { BoardState } from '../../dyn-boards/store/board.state';
import * as shellActions from './shell.actions';
import { DomainService } from '../services/dyn-domain.service';

@State<ShellStateModel>({
    name: 'app',
    children: [MenuState, BoardState],
    defaults: {
        menus: undefined,
        boards: undefined,
        domain: {
            validationStatus: undefined,
            checkingDomainName: false,
            domainChecked: false,
            domainExists: false
        }
    }
})
export class ShellState {

    @Selector()
    static domain(state: ShellStateModel): object {
        return state.domain;
    }

    @Selector()
    static checkingDomainName(state: ShellStateModel): boolean {
        return state.domain.checkingDomainName;
    }

    @Selector()
    static domainExists(state: ShellStateModel): boolean {
        return state.domain.domainExists;
    }

    @Selector()
    static domainChecked(state: ShellStateModel): boolean {
        return state.domain.domainChecked;
    }

    constructor(
        private domainService: DomainService
    ) {}

    @Action(shellActions.CheckDomainName)
    checkDomainName(ctx: StateContext<ShellStateModel>, event: shellActions.CheckDomainName) {
        let domain = ctx.getState().domain;
        const re = RegExp('^[0-9a-zA-Z \b]+$')
        if (event.name.length >= 4 && event.name.length <= 50 && re.test(event.name)) {
            domain = {...domain, checkingDomainName: true, domainChecked: false, validationStatus: 'validating'};
            ctx.patchState({ domain });
            this.domainService.checkUserDomain(event.name).subscribe(() => {
                ctx.dispatch(new shellActions.DomainNameUnique());
            }, (err) => {
                ctx.dispatch(new shellActions.DomainNameExists());
            });
        } else {
            domain = {...domain, checkingDomainName: false, domainChecked: false, validationStatus: 'warning'};
            ctx.patchState({ domain });
        }
    }

    @Action(shellActions.DomainNameExists)
    domainNameExists(ctx: StateContext<ShellStateModel>, event: shellActions.DomainNameExists) {
        console.log('ShellState::DomainNameExists');
        let domain = ctx.getState().domain;
        domain = {...domain, checkingDomainName: false, domainChecked: true, domainExists: true, validationStatus: 'error'};
        ctx.patchState({ domain });
    }

    @Action(shellActions.DomainNameUnique)
    domainNameUnique(ctx: StateContext<ShellStateModel>, event: shellActions.DomainNameUnique) {
        console.log('ShellState::DomainNameUnique');
        let domain = ctx.getState().domain;
        domain = {...domain, checkingDomainName: false, domainChecked: true, domainExists: false, validationStatus: 'success'};
        ctx.patchState({ domain });
    }
}

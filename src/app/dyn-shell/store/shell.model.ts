import { MenuStateModel, DynMenu } from '../../dyn-base/store/menu.model';
import { BoardStateModel, Board } from '../../dyn-boards/store/board.model';

export class ShellStateModel {
    menus: DynMenu[];
    boards: Board[];
    domain: {
        checkingDomainName: boolean;
        domainChecked: boolean;
        domainExists: boolean;
        validationStatus: 'success' | 'warning' | 'error' | 'validating'
    }
}

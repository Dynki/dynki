import { State } from '../../../../node_modules/@ngxs/store';
import { ShellStateModel } from './shell.model';
import { MenuState } from '../../dyn-base/store/menu.state';
import { BoardState } from '../../dyn-boards/store/board.state';

@State<ShellStateModel>({
    name: 'app',
    children: [MenuState, BoardState]
})
export class ShellState {

}

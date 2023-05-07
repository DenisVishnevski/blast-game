import { _decorator, Component, Node } from 'cc';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('PauseMenu')
export class PauseMenu extends Component {
    @property({type: Node})
    private gameplayBlock: Node | null = null;

    @property({type: Node})
    private pauseMenu: Node | null = null;

    public openMenu(): void {
        if (this.gameplayBlock === null) throw new ErrorMessage('gameplay block').notDefined
        if (this.pauseMenu === null) throw new ErrorMessage('pause menu').notDefined

        this.gameplayBlock.active = false;
        this.pauseMenu.active = true;
    }

    public closeMenu(): void {
        if (this.gameplayBlock === null) throw new ErrorMessage('gameplay block').notDefined
        if (this.pauseMenu === null) throw new ErrorMessage('pause menu').notDefined

        this.gameplayBlock.active = true;
        this.pauseMenu.active = false;
    }
}
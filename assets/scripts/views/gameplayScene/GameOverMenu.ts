import { _decorator, Component, Node } from 'cc';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('GameOverMenu')
export class GameOverMenu extends Component {
    @property({type: Node})
    private gameplayBlock: Node | null = null;

    @property({type: Node})
    private gameOverMenu: Node | null = null;

    @property({type: Node})
    private loseLabel: Node | null = null;

    @property({type: Node})
    private winLabel: Node | null = null;

    public openMenu(isWin: boolean): void {
        if (this.gameplayBlock === null) throw new ErrorMessage('gameplay block').notDefined
        if (this.gameOverMenu === null) throw new ErrorMessage('game over menu').notDefined
        if (this.loseLabel === null) throw new ErrorMessage('lose label').notDefined
        if (this.winLabel === null) throw new ErrorMessage('win label').notDefined

        this.gameplayBlock.active = false;
        this.gameOverMenu.active = true;

        if (isWin) {
            this.winLabel.active = true
        }
        else {
            this.loseLabel.active = true
        }
    }
}


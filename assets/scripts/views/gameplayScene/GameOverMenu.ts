import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverMenu')
export class GameOverMenu extends Component {
    @property({type: Node})
    private gameplayBlock: Node = null;

    @property({type: Node})
    private gameOverMenu: Node = null;

    @property({type: Node})
    private loseLabel: Node = null;

    @property({type: Node})
    private winLabel: Node = null;

    public openMenu(isWin: boolean): void {
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


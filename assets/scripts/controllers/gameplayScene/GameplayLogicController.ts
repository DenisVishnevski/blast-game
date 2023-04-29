import { _decorator, Component, Node } from 'cc';
import { EventsController } from '../EventsController';
import { GameplayLogicModel } from '../../models/gameplayScene/GameplayLogicModel';
import { InformationPanel } from '../../views/gameplayScene/InformationPanel';
import { GameOverMenu } from '../../views/gameplayScene/GameOverMenu';
const { ccclass, property } = _decorator;

@ccclass('GameplayLogicController')
export class GameplayLogicController extends Component {
    @property({ type: InformationPanel })
    private informationPanel: InformationPanel = null;

    @property({ type: GameplayLogicModel })
    private gameplayLogicModel: GameplayLogicModel = null;

    @property({type: GameOverMenu})
    private gameOverMenu: GameOverMenu = null;

    protected start(): void {
        const eventTarget = this.getComponent(EventsController).getEventTarget();

        eventTarget.on('onDestroyTiles', this.gameplayLogicModel.addPoint, this.gameplayLogicModel);

        eventTarget.on('onUpateClicksCount', this.informationPanel.setClicksCount, this.informationPanel);
        eventTarget.on('onUpatePointsCount', this.informationPanel.setPointsCount, this.informationPanel);

        eventTarget.on('onGameOver', this.gameOverMenu.openMenu, this.gameOverMenu);
    }
}


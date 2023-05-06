import { _decorator, Component, Node } from 'cc';
import { EventsController } from '../EventsController';
import { GameplayLogicModel } from '../../models/gameplayScene/GameplayLogicModel';
import { InformationPanel } from '../../views/gameplayScene/InformationPanel';
import { GameOverMenu } from '../../views/gameplayScene/GameOverMenu';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('GameplayLogicController')
export class GameplayLogicController extends Component {
    @property({ type: InformationPanel })
    private informationPanel: InformationPanel | null = null;

    @property({ type: GameplayLogicModel })
    private gameplayLogicModel: GameplayLogicModel | null = null;

    @property({type: GameOverMenu})
    private gameOverMenu: GameOverMenu | null = null;

    protected start(): void {
        const eventsController = this.getComponent(EventsController)

        if (eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.gameplayLogicModel === null) throw new ErrorMessage('GameplayLogicModel').notDefined
        if (this.informationPanel === null) throw new ErrorMessage('InformationPanel').notDefined
        if (this.gameOverMenu === null) throw new ErrorMessage('GameOverMenu').notDefined

        const eventTarget = eventsController.getEventTarget();
        eventTarget.on('onDestroyTiles', this.gameplayLogicModel.addPoint, this.gameplayLogicModel);

        eventTarget.on('onUpateClicksCount', this.informationPanel.setClicksCount, this.informationPanel);
        eventTarget.on('onUpatePointsCount', this.informationPanel.setPointsCount, this.informationPanel);

        eventTarget.on('onGameOver', this.gameOverMenu.openMenu, this.gameOverMenu);
    }
}


import { _decorator, Component, Node } from 'cc';
import { EventsController } from '../../controllers/EventsController';
import { GlobalSettings } from '../GlobalSettings';
import { GameSettings } from '../GameSettings';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('GameplayLogicModel')
export class GameplayLogicModel extends Component {
    @property({ type: EventsController })
    private eventsController: EventsController | null = null;

    private clicksCount: number = 0;
    private totalPointsCount: number = 0;
    private crrentPointsCount: number = 0;

    protected start(): void {
        const gameSettings: GameSettings | null = this.getComponent(GameSettings);
        if (gameSettings === null) {
            throw new ErrorMessage('GameSettings').notAdded
        }

        this.clicksCount = GlobalSettings.getClicksCount() ||
            gameSettings.getClicksCount();
        this.totalPointsCount = GlobalSettings.getTotalPointsCount() ||
            gameSettings.getTotalPointsCount();
    }

    public addPoint(destroyedTilesCount: number): void {
        if (this.eventsController === null) {
            throw new ErrorMessage('EventsController').notDefined
        } 

        this.crrentPointsCount += destroyedTilesCount;
        this.eventsController.getEventTarget().emit('onUpatePointsCount', this.crrentPointsCount);

        this.useClick();
    }

    private useClick(): void {
        if (this.eventsController === null) {
            throw new ErrorMessage('EventsController').notDefined
        } 

        this.clicksCount--;
        this.eventsController.getEventTarget().emit('onUpateClicksCount', this.clicksCount);

        this.gameOverHandler();
    }

    private gameOverHandler() {
        if (this.eventsController === null) {
            throw new ErrorMessage('EventsController').notDefined
        } 

        if (this.crrentPointsCount >= this.totalPointsCount) {
            this.eventsController.getEventTarget().emit('onGameOver', true);
        }
        else if (this.clicksCount <= 0) {
            this.eventsController.getEventTarget().emit('onGameOver', false);
        }
    }
}


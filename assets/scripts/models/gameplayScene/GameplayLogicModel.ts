import { _decorator, Component, Node } from 'cc';
import { EventsController } from '../../controllers/EventsController';
import { GlobalSettings } from '../GlobalSettings';
import { DevSettings } from '../DevSettings';
const { ccclass, property } = _decorator;

@ccclass('GameplayLogicModel')
export class GameplayLogicModel extends Component {
    @property({ type: EventsController })
    private eventsController: EventsController = null;

    private clicksCount: number = 0;
    private totalPointsCount: number = 0;
    private crrentPointsCount: number = 0;


    isWin: boolean

    protected start(): void {
        this.clicksCount = GlobalSettings.getClicksCount() ||
            this.getComponent(DevSettings).getClicksCount();
        this.totalPointsCount = GlobalSettings.getTotalPointsCount() ||
            this.getComponent(DevSettings).getTotalPointsCount();
    }

    public addPoint(destroyedTilesCount: number): void {
        this.crrentPointsCount += destroyedTilesCount;
        this.eventsController.getEventTarget().emit('onUpatePointsCount', this.crrentPointsCount);

        this.useClick();
    }

    private useClick(): void {
        this.clicksCount--;
        this.eventsController.getEventTarget().emit('onUpateClicksCount', this.clicksCount);

        this.gameOverHandler();
    }

    private gameOverHandler() {
        if (this.crrentPointsCount >= this.totalPointsCount) {
            this.eventsController.getEventTarget().emit('onGameOver', true);
        }
        else if (this.clicksCount <= 0) {
            this.eventsController.getEventTarget().emit('onGameOver', false);
        }
    }
}


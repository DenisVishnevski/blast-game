import { _decorator, Component, find, Label, Node } from 'cc';
import { EventsController } from '../../controllers/EventsController';
import { GameSettings } from '../../models/GameSettings';
const { ccclass, property } = _decorator;

@ccclass('DifficultySetting')
export class DifficultySetting extends Component {
    private eventsController: EventsController;

    private difficultyLevel: GameSettings;;

    protected start(): void {
        this.eventsController = find('Controller').getComponent(EventsController);
    }

    public setValue(difficultyLevel: GameSettings): void {
        this.difficultyLevel = difficultyLevel;
        this.displayValue();
    }

    private displayValue(): void {
        const label = this.node.getChildByName('Label');
        const valueByString = this.difficultyLevel.getTilesContainerSize().toString();

        label.getComponent(Label).string = `${valueByString}x${valueByString}`
    }

    private onClick(): void {
        this.eventsController.getEventTarget().emit('onStartGame', this.difficultyLevel);
    }
}


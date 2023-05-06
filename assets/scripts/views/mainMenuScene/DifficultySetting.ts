import { _decorator, Component, find, Label, Node } from 'cc';
import { EventsController } from '../../controllers/EventsController';
import { GameSettings } from '../../models/GameSettings';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('DifficultySetting')
export class DifficultySetting extends Component {
    private eventsController: EventsController | null = null;

    private difficultyLevel: GameSettings | null = null;

    protected start(): void {
        const controller = find('Controller');
        if (controller === null) throw new ErrorMessage('Controller').notFound
        this.eventsController = controller.getComponent(EventsController);
    }

    public setValue(difficultyLevel: GameSettings): void {
        this.difficultyLevel = difficultyLevel;
        this.displayValue();
    }

    private displayValue(): void {
        const labelNode = this.node.getChildByName('Label');
        if (this.difficultyLevel === null) throw new ErrorMessage('GameSettings').notDefined
        if (labelNode === null) throw new ErrorMessage('GameSettings').notFound
        
        const valueByString = this.difficultyLevel.getTilesContainerSize().toString();

        const label = labelNode.getComponent(Label);
        if (label === null) throw new ErrorMessage('GameSettings').notAdded

        label.string = `${valueByString}x${valueByString}`
    }

    private onClick(): void {
        if (this.eventsController === null) {
            throw new ErrorMessage('EventsController').notAdded
        } 
        this.eventsController.getEventTarget().emit('onStartGame', this.difficultyLevel);
    }
}


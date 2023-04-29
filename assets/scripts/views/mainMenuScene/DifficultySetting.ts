import { _decorator, Component, find, Label, Node } from 'cc';
import { EventsController } from '../../controllers/EventsController';
const { ccclass, property } = _decorator;

@ccclass('DifficultySetting')
export class DifficultySetting extends Component {
    private eventsController: EventsController;

    private tilesContainerSize: number = 0;

    protected start(): void {
        this.eventsController = find('Controller').getComponent(EventsController);
        
    }

    public setValue(tilesContainerSize: number): void {
        this.tilesContainerSize = tilesContainerSize;
        this.displayValue();
    }

    private displayValue(): void {
        const label = this.node.getChildByName('Label');
        const valueByString = this.tilesContainerSize.toString();

        label.getComponent(Label).string = `${valueByString}x${valueByString}`
    }

    private onClick(): void {
        this.eventsController.getEventTarget().emit('onStartGame', this.tilesContainerSize);
    }
}


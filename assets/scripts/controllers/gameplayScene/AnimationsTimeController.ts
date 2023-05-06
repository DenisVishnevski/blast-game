import { _decorator, Component, Node } from 'cc';
import { EventsController } from '../EventsController';
import { ContainerModel } from '../../models/gameplayScene/ContainerModel';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('AnimationsTimeController')
export class AnimationsTimeController extends Component {
    @property({ type: ContainerModel })
    private containerModel: ContainerModel | null = null;

    protected start(): void {
        const eventsController = this.getComponent(EventsController)
        if (eventsController === null) {
            throw new ErrorMessage('EventsController').notAdded
        } 
        const eventTarget = eventsController.getEventTarget();
        eventTarget.on('onEndAnimation', this.executeActions, this);
    }

    private executeActions(): void {

    }
}


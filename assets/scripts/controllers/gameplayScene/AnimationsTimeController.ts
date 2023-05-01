import { _decorator, Component, Node } from 'cc';
import { EventsController } from '../EventsController';
import { ContainerModel } from '../../models/gameplayScene/ContainerModel';
const { ccclass, property } = _decorator;

@ccclass('AnimationsTimeController')
export class AnimationsTimeController extends Component {
    @property({ type: ContainerModel })
    private containerModel: ContainerModel = null;

    protected start(): void {
        const eventTarget = this.getComponent(EventsController).getEventTarget();
        eventTarget.on('onEndAnimation', this.executeActions, this);
    }

    private executeActions(): void {

    }
}


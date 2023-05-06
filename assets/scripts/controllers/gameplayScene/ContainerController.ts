import { _decorator, Component, Node } from 'cc';
import { Container } from '../../views/gameplayScene/Container';
import { ContainerModel } from '../../models/gameplayScene/ContainerModel';
import { EventsController } from '../EventsController';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('ContainerController')
export class ContainerController extends Component {
    @property({ type: Container })
    private container: Container | null = null;

    @property({ type: ContainerModel })
    private containerModel: ContainerModel | null = null;

    protected onLoad(): void {
        const eventsController = this.getComponent(EventsController)

        if (eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.containerModel === null) throw new ErrorMessage('ContainerModel').notDefined
        if (this.container === null) throw new ErrorMessage('Container').notDefined

        const eventTarget = eventsController.getEventTarget();
        eventTarget.on('onLoaded', this.setTiles, this);
        eventTarget.on('onTileClick', this.containerModel.handleTile, this.containerModel);
        eventTarget.on('onUpdate', this.container.updateTiles, this.container);
        eventTarget.on('onQuickUpdate', this.container.quickUpdate, this.container);
        eventTarget.on('onReset', this.container.resetTiles, this.container);
    }

    private setTiles() {
        if (this.containerModel === null) throw new ErrorMessage('Container').notDefined
        if (this.container === null) throw new ErrorMessage('Container').notDefined

        this.container.setSpritesToTiles(this.containerModel.getTiles());
    }

}


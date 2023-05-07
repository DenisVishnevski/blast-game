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

    private eventsController: EventsController | null = null;

    protected onLoad(): void {
        this.eventsController = this.getComponent(EventsController);

        if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.containerModel === null) throw new ErrorMessage('ContainerModel').notDefined
        if (this.container === null) throw new ErrorMessage('Container').notDefined

        const eventTarget = this.eventsController.getEventTarget();
        eventTarget.on('onLoaded', this.setTiles, this);
        eventTarget.on('onTileClick', this.containerModel.handleTile, this.containerModel);
        eventTarget.on('onDestroyableTilesCheck', this.containerModel.destroyableTilesCheck, this.containerModel);
        eventTarget.on('onUpdate', this.container.updateTiles, this.container);
        eventTarget.on('onQuickUpdate', this.container.quickUpdate, this.container);
        eventTarget.on('onReset', this.container.resetTiles, this.container);
        eventTarget.on('onNeedDestroyableTilesCheck', this.checkTiles, this);
    }

    private async checkTiles(): Promise<void> {
        this.scheduleOnce(() => {
            if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded
            this.eventsController.getEventTarget().emit('onDestroyableTilesCheck');
        }, 1.2);
    }

    private setTiles() {
        if (this.containerModel === null) throw new ErrorMessage('Container').notDefined
        if (this.container === null) throw new ErrorMessage('Container').notDefined

        this.container.setSpritesToTiles(this.containerModel.getTiles());
    }

    protected onDestroy(): void {
        this.eventsController = this.getComponent(EventsController);

        if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.containerModel === null) throw new ErrorMessage('ContainerModel').notDefined
        if (this.container === null) throw new ErrorMessage('Container').notDefined

        const eventTarget = this.eventsController.getEventTarget();
        eventTarget.off('onLoaded', this.setTiles, this);
        eventTarget.off('onTileClick', this.containerModel.handleTile, this.containerModel);
        eventTarget.off('onDestroyableTilesCheck', this.containerModel.destroyableTilesCheck, this.containerModel);
        eventTarget.off('onUpdate', this.container.updateTiles, this.container);
        eventTarget.off('onQuickUpdate', this.container.quickUpdate, this.container);
        eventTarget.off('onReset', this.container.resetTiles, this.container);
        eventTarget.off('onNeedDestroyableTilesCheck', this.checkTiles, this);
    }

}


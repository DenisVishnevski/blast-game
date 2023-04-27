import { _decorator, Component, Node } from 'cc';
import { Tile } from '../views/Tile';
import { Container } from '../views/Container';
import { ContainerModel } from '../models/ContainerModel';
import { EventsController } from './EventsController';
const { ccclass, property } = _decorator;

@ccclass('ContainerController')
export class ContainerController extends Component {
    @property({ type: Container })
    private container: Container = null;

    @property({ type: ContainerModel })
    private containerModel: ContainerModel = null;

    protected start(): void {
        const eventTarget = this.getComponent(EventsController).getEventTarget();

        eventTarget.on('onLoaded', this.setTiles, this);
        eventTarget.on('onTileClick', this.containerModel.handleTile, this.containerModel);
        eventTarget.on('onUpdate', this.container.updateTiles, this.container);
    }

    private setTiles() {
        try {
            this.container.setSpritesToTiles(this.containerModel.getTiles());
        } catch (error) {
            console.error(error);
        }
    }
}


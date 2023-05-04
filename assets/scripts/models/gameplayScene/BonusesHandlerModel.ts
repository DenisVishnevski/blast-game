import { _decorator, Component, Node } from 'cc';
import { BombModel } from './bonuses/BombModel';
import { IBonus } from './bonuses/IBonus';
import { ContainerModel } from './ContainerModel';
import { TileModel } from './TileModel';
import { EventsController } from '../../controllers/EventsController';
const { ccclass, property } = _decorator;

@ccclass('BonusesHandlerModel')
export class BonusesHandlerModel extends Component {
    @property({ type: EventsController })
    private eventsController: EventsController = null;

    @property({ type: ContainerModel })
    private containerModel: ContainerModel = null;

    private bombModel: IBonus = null;

    protected start(): void {
        this.bombModel = this.getComponent(BombModel);
    }

    public useBomb(tileСoordinates: { x: number, y: number }): void {
        const newTilesList: TileModel[][] = this.containerModel.getTiles();

        const destroyedTilesСoordinates = [tileСoordinates];

        destroyedTilesСoordinates.forEach((tileСoordinates: { x: number, y: number }) => {
            const tile = newTilesList[tileСoordinates.x];
            console.log();
            if (tile !== undefined) {
                tile.splice(tileСoordinates.y, 1);
                tile.push(this.containerModel.addNewTile());
            }
        });
        this.eventsController.getEventTarget().emit('onUpdate', destroyedTilesСoordinates, newTilesList);
        this.eventsController.getEventTarget().emit('onDestroyTiles', destroyedTilesСoordinates.length);
        this.bombModel.use();
    }
}


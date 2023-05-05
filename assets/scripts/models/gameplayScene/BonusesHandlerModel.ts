import { _decorator, Component, Node } from 'cc';
import { BombModel } from './bonuses/BombModel';
import { ContainerModel } from './ContainerModel';
import { TileModel } from './TileModel';
import { EventsController } from '../../controllers/EventsController';
import { TilesArray } from '../../utils/TilesArray';
import { IBombBonus } from './bonuses/IBombBonus';
import { TeleportModel } from './bonuses/TeleportModel';
import { ITeleportBonus } from './bonuses/ITeleportBonus';
const { ccclass, property } = _decorator;

@ccclass('BonusesHandlerModel')
export class BonusesHandlerModel extends Component {
    @property({ type: EventsController })
    private eventsController: EventsController = null;

    @property({ type: ContainerModel })
    private containerModel: ContainerModel = null;

    private tilesList: TileModel[][] = null;

    private bombModel: IBombBonus = null;
    private teleportModel: ITeleportBonus = null;

    protected start(): void {
        this.tilesList = this.containerModel.getTiles();

        this.bombModel = this.getComponent(BombModel);
        this.teleportModel = this.getComponent(TeleportModel);
    }

    public useBomb(tileСoordinates: { x: number, y: number }): void {
        const tilesArray: TilesArray = new TilesArray([]);

        let destroyedTilesСoordinates = tilesArray.addCoordinatesAround(tileСoordinates, this.bombModel.getRange());
        tilesArray.largestToSmallestYSort();
        destroyedTilesСoordinates = tilesArray.getUniqueTiles();

        destroyedTilesСoordinates = destroyedTilesСoordinates.filter(tileСoordinates => {
            if (this.tilesList[tileСoordinates.x] === undefined) return false
            if (this.tilesList[tileСoordinates.x][tileСoordinates.y] === undefined) return false
            return true
        });
        destroyedTilesСoordinates.forEach((destroyedTileСoordinates: { x: number, y: number }) => {
            const tile = this.tilesList[destroyedTileСoordinates.x];
            if (tile !== undefined) {
                tile.splice(destroyedTileСoordinates.y, 1);
                tile.push(this.containerModel.addNewTile());
            }
        });
        this.eventsController.getEventTarget().emit('onUpdate', destroyedTilesСoordinates, this.tilesList);
        this.eventsController.getEventTarget().emit('onDestroyTiles', destroyedTilesСoordinates.length);
        this.bombModel.use();
    }

    private firstTile: { id: number, coordinates: { x: number, y: number } } = null
    private secondTile: { id: number, coordinates: { x: number, y: number } } = null

    public useTeleport(tileСoordinates: { x: number, y: number }): void {
        if (this.firstTile === null) {
            this.firstTile = {
                id: this.tilesList[tileСoordinates.x][tileСoordinates.y].getId(),
                coordinates: tileСoordinates
            }
            this.teleportModel.selectTile(this.firstTile.id);
        }
        else if (this.secondTile === null) {
            this.secondTile = {
                id: this.tilesList[tileСoordinates.x][tileСoordinates.y].getId(),
                coordinates: tileСoordinates
            }
            this.tilesList[this.firstTile.coordinates.x][this.firstTile.coordinates.y].setId(this.secondTile.id);
            this.tilesList[this.secondTile.coordinates.x][this.secondTile.coordinates.y].setId(this.firstTile.id);
            
            this.eventsController.getEventTarget().emit('onQuickUpdate', [this.firstTile.coordinates, this.secondTile.coordinates], this.tilesList);
            this.teleportModel.use();
        }
    }
    
    public cancelTeleport(): void {
        this.firstTile = null;
        this.secondTile = null;
    }
}


import { _decorator, Component, Node } from 'cc';
import { BombModel } from './bonuses/BombModel';
import { ContainerModel } from './ContainerModel';
import { TileModel } from './TileModel';
import { EventsController } from '../../controllers/EventsController';
import { TilesArray } from '../../utils/TilesArray';
import { IBombBonus } from './bonuses/IBombBonus';
import { TeleportModel } from './bonuses/TeleportModel';
import { ITeleportBonus } from './bonuses/ITeleportBonus';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('BonusesHandlerModel')
export class BonusesHandlerModel extends Component {
    @property({ type: EventsController })
    private eventsController: EventsController | null = null;

    @property({ type: ContainerModel })
    private containerModel: ContainerModel | null = null;

    private tilesList: TileModel[][] | null = null;

    private bombModel: IBombBonus | null = null;
    private teleportModel: ITeleportBonus | null = null;

    protected start(): void {
        if (this.containerModel === null) {
            throw new ErrorMessage('ContainerModel').notDefined
        } 
        this.tilesList = this.containerModel.getTiles();

        this.bombModel = this.getComponent(BombModel);
        this.teleportModel = this.getComponent(TeleportModel);
    }

    public useBomb(tileСoordinates: { x: number, y: number }): void {
        if (this.bombModel === null) {
            throw new ErrorMessage('BombModel').notAdded
        } 
        const tilesArray: TilesArray = new TilesArray([]);

        let destroyedTilesСoordinates = tilesArray.addCoordinatesAround(tileСoordinates, this.bombModel.getRange());
        tilesArray.largestToSmallestYSort();
        destroyedTilesСoordinates = tilesArray.getUniqueTiles();

        destroyedTilesСoordinates = destroyedTilesСoordinates.filter(tileСoordinates => {
            if (this.tilesList === null) {
                throw new ErrorMessage('TileModel').notDefined
            }

            if (this.tilesList[tileСoordinates.x] === undefined) return false
            if (this.tilesList[tileСoordinates.x][tileСoordinates.y] === undefined) return false
            return true
        });
        destroyedTilesСoordinates.forEach((destroyedTileСoordinates: { x: number, y: number }) => {
            if (this.tilesList === null) {
                throw new ErrorMessage('TileModel').notDefined
            }
            if (this.containerModel === null) {
                throw new ErrorMessage('ContainerModel').notDefined
            } 

            const tile = this.tilesList[destroyedTileСoordinates.x];
            if (tile !== undefined) {
                tile.splice(destroyedTileСoordinates.y, 1);
                tile.push(this.containerModel.addNewTile());
            }
        });
        if (this.eventsController === null) {
            throw new ErrorMessage('EventsController').notDefined
        } 

        this.eventsController.getEventTarget().emit('onUpdate', destroyedTilesСoordinates, this.tilesList);
        this.eventsController.getEventTarget().emit('onDestroyTiles', destroyedTilesСoordinates.length);
        this.bombModel.use();
    }

    private firstTile: { id: number, coordinates: { x: number, y: number } } | null = null
    private secondTile: { id: number, coordinates: { x: number, y: number } } | null  = null

    public useTeleport(tileСoordinates: { x: number, y: number }): void {
        if (this.tilesList === null) {
            throw new ErrorMessage('TileModel').notDefined
        }
        if (this.teleportModel === null) {
            throw new ErrorMessage('BombModel').notAdded
        } 

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

            if (this.eventsController === null) {
                throw new Error('Component "EventsController" was not defined in inspector');
            } 
            
            this.eventsController.getEventTarget().emit('onQuickUpdate', [this.firstTile.coordinates, this.secondTile.coordinates], this.tilesList);
            this.teleportModel.use();
        }
    }
    
    public cancelTeleport(): void {
        this.firstTile = null;
        this.secondTile = null;
    }
}


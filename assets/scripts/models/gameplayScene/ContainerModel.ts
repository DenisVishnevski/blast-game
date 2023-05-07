import { _decorator, Component, Node } from 'cc';
import { TileModel } from './TileModel';
import { GlobalSettings } from '../GlobalSettings';
import { EventsController } from '../../controllers/EventsController';
import { TilesArray } from '../../utils/TilesArray';
import { TilesHandlerModel } from './TilesHandlerModel';
import { GameSettings } from '../GameSettings';
import { ResetModel } from './bonuses/ResetModel';
import { IResetBonus } from './bonuses/IResetBonus';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

type CheckedTile = {
    status: boolean,
    destroyedTilesList: { x: number, y: number }[]
}

@ccclass('ContainerModel')
export class ContainerModel extends Component {
    @property({ type: EventsController })
    private eventsController: EventsController | null = null;

    @property({ type: ResetModel })
    private resetModel: IResetBonus | null = null;

    private size: number = 0;

    private itemsCount: number = 5;
    private tiles: TileModel[][] = [];

    protected start(): void {
        const gameSettings: GameSettings | null = this.getComponent(GameSettings);
        if (gameSettings === null) {
            throw new ErrorMessage('GameSettings').notAdded
        } 

        this.size = GlobalSettings.getTilesContainerSize()
            || gameSettings.getTilesContainerSize();
        this.initTiles();
    }

    public getTiles() {
        return this.tiles
    }

    public setTiles(tiles: TileModel[][]) {
        this.tiles = tiles;
    }

    public handleTile(tileСoordinates: { x: number, y: number }) {
        const checkedTile: CheckedTile = this.checkTile(tileСoordinates);
        if (checkedTile.status) {
            let destroyedTilesList: { x: number, y: number }[] = checkedTile.destroyedTilesList;
            destroyedTilesList = new TilesArray(destroyedTilesList).largestToSmallestYSort();

            destroyedTilesList.forEach((tileСoordinates: { x: number, y: number }) => {
                this.tiles[tileСoordinates.x].splice(tileСoordinates.y, 1);
                this.tiles[tileСoordinates.x].push(this.addNewTile());
            });

            if (this.eventsController === null) {
                throw new ErrorMessage('EventsController').notDefined
            } 
            this.eventsController.getEventTarget().emit('onUpdate', destroyedTilesList, this.tiles);
            this.eventsController.getEventTarget().emit('onDestroyTiles', destroyedTilesList.length);
            this.eventsController.getEventTarget().emit('onNeedDestroyableTilesCheck');
        }
    }

    private checkTile(tileСoordinates: { x: number, y: number }): CheckedTile {
        const tilesHandlerModel: TilesHandlerModel = new TilesHandlerModel(this.tiles);
        const destroyedTilesList: { x: number, y: number }[] = tilesHandlerModel.getDestroyedTiles(tileСoordinates);

        if (destroyedTilesList.length > 1) {
            return { status: true, destroyedTilesList }
        }
        return { status: false, destroyedTilesList }
    }

    public resetTiles(autoActuation?: boolean) {
        if (this.resetModel === null) {
            throw new ErrorMessage('ResetModel').notDefined
        } 
        if (this.eventsController === null) {
            throw new ErrorMessage('EventsController').notDefined
        } 
        
        if (this.resetModel.getAutoActuationsCount() <= 0 && autoActuation === true) {
            this.eventsController.getEventTarget().emit('onGameOver', false);
            return
        }
        if (this.resetModel.getUsesCount() > 0) {
            this.tiles = [];
            this.initTiles();
            this.eventsController.getEventTarget().emit('onReset', this.tiles);
            this.resetModel.use();
            if (autoActuation === true) {
                this.resetModel.autoActuation();
            }
            this.eventsController.getEventTarget().emit('onNeedDestroyableTilesCheck');
        }
        else if (autoActuation === true) {
            this.eventsController.getEventTarget().emit('onGameOver', false);
        }
    }

    public destroyableTilesCheck(): void {
        let isDestroyable: boolean = false
        this.tiles.forEach((tilesColumn: TileModel[], x) => {
            for (let y = 0; y < tilesColumn.length; y++) {
                if (this.checkTile({ x, y }).status) {
                    isDestroyable = true
                    return
                }
            }
        });
        if (isDestroyable === false) {
            this.resetTiles(true);
        } 
        else {
            if (this.resetModel === null) {
                throw new ErrorMessage('ResetModel').notDefined
            } 
            this.resetModel.restoreAutoActuationsCount()
        }
    }

    private initTiles(): void {
        for (let x = 0; x < this.size; x++) {
            const column: TileModel[] = []

            for (let y = 0; y < this.size; y++) {
                column.push(this.addNewTile());
            }
            this.tiles.push(column);
        }
    }

    public addNewTile() {
        const newTile: TileModel = new TileModel();
        newTile.setId(this.getRandomNumber());
        return newTile
    }

    private getRandomNumber(): number {
        const min = Math.ceil(0);
        const max = Math.floor(this.itemsCount);
        return Math.floor(Math.random() * (max - min) + min);
    }
}


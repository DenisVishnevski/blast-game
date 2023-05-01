import { _decorator, Component, Node } from 'cc';
import { TileModel } from './TileModel';
import { GlobalSettings } from '../GlobalSettings';
import { EventsController } from '../../controllers/EventsController';
import { TilesArray } from '../../utils/TilesArray';
import { DevSettings } from '../DevSettings';
import { TilesHandlerModel } from './TilesHandlerModel';
import { ResetModel } from './ResetModel';
import { IResetBonus } from './IResetBonus';
const { ccclass, property } = _decorator;

type CheckedTile = {
    status: boolean,
    destroyedTilesList: { x: number, y: number }[]
}

@ccclass('ContainerModel')
export class ContainerModel extends Component {
    @property({ type: EventsController })
    private eventsController: EventsController = null;

    @property({ type: ResetModel })
    private resetModel: IResetBonus = null;

    private size: number = 0;

    private itemsCount: number = 5;
    private tiles: TileModel[][] = [];

    protected start(): void {
        this.size = GlobalSettings.getTilesContainerSize()
            || this.getComponent(DevSettings).getTilesContainerSize();
        this.initTiles();
    }

    public getTiles() {
        return this.tiles
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
            this.eventsController.getEventTarget().emit('onUpdate', destroyedTilesList, this.tiles);
            this.eventsController.getEventTarget().emit('onDestroyTiles', destroyedTilesList.length);

            this.scheduleOnce(() => {
                this.destroyableTilesCheck();
            }, 1); 
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
        if (this.resetModel.getAutoActuationsCount() <= 0 ) {
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
            this.scheduleOnce(() => {
                this.destroyableTilesCheck();
            }, 1); 
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

    private addNewTile() {
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


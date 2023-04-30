import { _decorator, Component, Node } from 'cc';
import { TileModel } from './TileModel';
import { GlobalSettings } from '../GlobalSettings';
import { EventsController } from '../../controllers/EventsController';
import { TilesArray } from '../../utils/TilesArray';
import { DevSettings } from '../DevSettings';
const { ccclass, property } = _decorator;

@ccclass('ContainerModel')
export class ContainerModel extends Component {
    @property({ type: EventsController })
    private eventsController: EventsController = null;

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

    public handleTile(tileСoordinates: { x: number, y: number }): void {
        const destroyedTilesList = this.getDestroyedTiles([tileСoordinates]);
        if (destroyedTilesList.length > 1) {
            this.resetTilesList(destroyedTilesList);
            this.eventsController.getEventTarget().emit('onUpdate', destroyedTilesList, this.tiles);
            this.eventsController.getEventTarget().emit('onDestroyTiles', destroyedTilesList.length);
        }
    }

    private resetTilesList(destroyedTiles: { x: number, y: number }[]) {
        destroyedTiles = new TilesArray(destroyedTiles).largestToSmallestYSort();

        destroyedTiles.forEach((tileСoordinates: { x: number, y: number }) => {
            this.tiles[tileСoordinates.x].splice(tileСoordinates.y, 1);
            this.tiles[tileСoordinates.x].push(this.addNewTile());
        });
    }

    private getDestroyedTiles(checkingTiles: { x: number, y: number }[]): { x: number, y: number }[] {
        const finishedTilesList: { x: number, y: number }[] = checkingTiles;
        let newTiles: { x: number, y: number }[] = [];

        checkingTiles.forEach((checkingTile: { x: number, y: number }) => {
            const checkedTilesList = [
                ...this.getVerticalSameTiles(checkingTile),
                ...this.getHorisontalSameTiles(checkingTile),
            ];
            newTiles.push(...checkedTilesList.filter((checkedTile: { x: number, y: number }) => {
                let isUnique: boolean = true;

                (finishedTilesList.forEach((finishedTile: { x: number, y: number }) => {
                    if (checkedTile.x === finishedTile.x && checkedTile.y === finishedTile.y) {
                        isUnique = false;
                    }
                }));
                return isUnique
            }));
        });
        newTiles = new TilesArray(newTiles).getUniqueTiles();

        if (newTiles.length > 0 && finishedTilesList.length < 20) {
            return this.getDestroyedTiles([...finishedTilesList, ...newTiles]);
        }
        return finishedTilesList
    }

    private getVerticalSameTiles(tileСoordinates: { x: number, y: number }) {
        const checkedTile: TileModel = this.tiles[tileСoordinates.x][tileСoordinates.y];
        const topTile: TileModel = this.tiles[tileСoordinates.x][tileСoordinates.y + 1];
        const bottomTile: TileModel = this.tiles[tileСoordinates.x][tileСoordinates.y - 1];

        const sameTiles = [];
        if (topTile && checkedTile.getId() === topTile.getId()) {
            sameTiles.push({ x: tileСoordinates.x, y: tileСoordinates.y + 1 });
        }
        if (bottomTile && checkedTile.getId() === bottomTile.getId()) {
            sameTiles.push({ x: tileСoordinates.x, y: tileСoordinates.y - 1 });
        }
        return sameTiles
    }

    private getHorisontalSameTiles(tileСoordinates: { x: number, y: number }) {
        const checkedTile: TileModel = this.tiles[tileСoordinates.x][tileСoordinates.y];
        const leftTile: TileModel = this.tiles[tileСoordinates.x - 1] && this.tiles[tileСoordinates.x - 1][tileСoordinates.y];
        const rightTile: TileModel = this.tiles[tileСoordinates.x + 1] && this.tiles[tileСoordinates.x + 1][tileСoordinates.y];

        const sameTiles: { x: number, y: number }[] = [];
        if (rightTile && checkedTile.getId() === rightTile.getId()) {
            sameTiles.push({ x: tileСoordinates.x + 1, y: tileСoordinates.y });
        }
        if (leftTile && checkedTile.getId() === leftTile.getId()) {
            sameTiles.push({ x: tileСoordinates.x - 1, y: tileСoordinates.y });
        }
        return sameTiles
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


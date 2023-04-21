import { _decorator, Component, Node } from 'cc';
import { TileModel } from './TileModel';
const { ccclass, property } = _decorator;

@ccclass('Container')
export class ContainerModel extends Component {
    @property
    private size: number = 0;

    private itemsCount: number = 5;
    private tiles: TileModel[] = [];

    protected start(): void {
        this.initTiles();
    }

    public getTiles() {
        return this.tiles
    }

    private initTiles(): void {
        for (let index = 0; index < this.size ** 2; index++) {
            const newTile: TileModel = new TileModel();
            newTile.setId(this.getRandomNumber());

            this.tiles.push(newTile);
        }
    }

    private getRandomNumber(): number {
        const min = Math.ceil(0);
        const max = Math.floor(this.itemsCount);
        return Math.floor(Math.random() * (max - min) + min);
    }
}


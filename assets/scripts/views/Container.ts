import { _decorator, Component, instantiate, Layout, Node, Prefab, Size, Sprite, SpriteFrame, UITransform } from 'cc';
import { Tile } from './Tile';
import { TileModel } from '../models/TileModel';
import { ContainerController } from '../controllers/ContainerController';
import { EventsController } from '../controllers/EventsController';
const { ccclass, property } = _decorator;

@ccclass('Container')
export class Container extends Component {
    @property
    private size: number = 0;

    @property({ type: Prefab })
    private tilePrefab: Prefab = null;

    @property({ type: EventsController })
    private eventsController: EventsController = null;

    private tiles: Tile[] = [];

    private isLoaded: boolean = false;

    protected async start(): Promise<void> {
        await this.setTilesSize();
        await this.initTiles();

        this.isLoaded = true;
        this.eventsController.getEventTarget().emit('isLoaded');
    }

    public async setSpritesToTiles(tilesIdList: TileModel[]): Promise<void> {
        this.tiles.forEach((tile: Tile, index) => {
            tile.setSprite(tilesIdList[index].getId());
        });
    }

    private async setTilesSize(): Promise<void> {
        const uiTransform = this.node.getComponent(UITransform);
        const layout = this.node.getComponent(Layout);

        const tileWidth = (uiTransform.width - layout.padding * 2) / this.size;
        const tileHeight = tileWidth + tileWidth / 12;

        const tileSize: Size = new Size(tileWidth, tileHeight);

        layout.cellSize.set(tileSize);
        layout.spacingY = -tileSize.height / 10;
    }

    private async initTiles(): Promise<void> {
        for (let index = 0; index < this.size ** 2; index++) {
            try {
                const newTile = instantiate(this.tilePrefab);

                newTile.name = this.tilePrefab.name + index
                newTile.parent = this.node;
    
                this.tiles.push(newTile.getComponent(Tile));

            } catch (error) {
                console.error(error);
            }
        }
    }
}


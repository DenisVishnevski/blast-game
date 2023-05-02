import { _decorator, Button, Component, instantiate, Layout, Node, Prefab, Size, Sprite, SpriteFrame, UITransform } from 'cc';
import { GlobalSettings } from '../../models/GlobalSettings';
import { EventsController } from '../../controllers/EventsController';
import { TilesArray } from '../../utils/TilesArray';
import { Tile } from './Tile';
import { TilesAnimationsHandler } from './TilesAnimationsHandler';
import { TileModel } from '../../models/gameplayScene/TileModel';
import { GameSettings } from '../../models/GameSettings';
const { ccclass, property } = _decorator;
@ccclass('Container')
export class Container extends Component {
    @property({ type: GameSettings })
    private devSettings: GameSettings = null;

    @property({ type: Prefab })
    private tilePrefab: Prefab = null;

    @property({ type: EventsController })
    private eventsController: EventsController = null;

    @property({ type: Button })
    private blockPanel: Button = null;

    private tilesAnimation: TilesAnimationsHandler;

    private size: number = 0;

    private tiles: Tile[][] = [];
    private tilesSize: Size;

    private isLoaded: boolean = false;

    protected async start(): Promise<void> {
        this.size = GlobalSettings.getTilesContainerSize() || this.devSettings.getTilesContainerSize();
        this.tilesAnimation = this.getComponent(TilesAnimationsHandler);

        await this.setTilesSize();
        await this.initTiles();

        this.isLoaded = true;
        this.eventsController.getEventTarget().emit('onLoaded');
    }

    public updateTiles(destroyedTiles: { x: number, y: number }[], tilesList: TileModel[][]) {
        this.blockTilesForClick();

        this.tilesAnimation.destroyAnimation(new TilesArray(destroyedTiles).getTilesByСoordinates(this.tiles));
        this.tiles.forEach((tilesColumn: Tile[], x) => {
            tilesColumn.forEach((tile: Tile, y) => {
                let minY: number = this.size;
                let rawDestroyedTiles: { x: number, y: number }[] = [];

                destroyedTiles.forEach((tileСoordinates: { x: number, y: number }) => {
                    if (tileСoordinates.x === x) {
                        if (tileСoordinates.y < minY) {
                            minY = tileСoordinates.y;
                        }
                        tile.setSprite(tilesList[x][y].getId());
                        rawDestroyedTiles.push(tileСoordinates);
                    }
                });
                rawDestroyedTiles = new TilesArray(rawDestroyedTiles).smallestToLargestYSort();
                this.tilesAnimation.fallingAnimation(rawDestroyedTiles, tile, y, minY)
            });

        });
        this.scheduleOnce(this.unblockTilesForClick, .55);
    }

    public resetTiles(tilesList: TileModel[][]): void {
        this.blockTilesForClick();
        const tilesAnimation = new TilesAnimationsHandler();
        tilesAnimation.resetAnimation(this.tiles);
        this.setSpritesToTiles(tilesList);

        this.scheduleOnce(this.unblockTilesForClick, .55);
    }

    public async setSpritesToTiles(tilesList: TileModel[][]): Promise<void> {
        this.tiles.forEach((column: Tile[], x) => {
            column.forEach((tile: Tile, y) => {
                tile.setSprite(tilesList[x][y].getId());
            });
        });
    }

    private blockTilesForClick() {
        this.blockPanel.onEnable();
    }

    private unblockTilesForClick() {
        this.blockPanel.onDisable();
    }

    private async setTilesSize(): Promise<void> {
        const uiTransform = this.node.getComponent(UITransform);
        const layout = this.node.getComponent(Layout);

        const tileWidth = (uiTransform.width - layout.padding * 2) / this.size;
        const tileHeight = tileWidth + tileWidth / 12;

        this.tilesSize = new Size(tileWidth, tileHeight);

        layout.cellSize.set(this.tilesSize);
        layout.spacingY = -this.tilesSize.height / 10;
    }

    private async initTiles(): Promise<void> {
        for (let x = 0; x < this.size; x++) {
            const column: Tile[] = []

            for (let y = 0; y < this.size; y++) {
                try {
                    const newTile = instantiate(this.tilePrefab);
                    newTile.name = this.tilePrefab.name + ` (${x}, ${y})`;
                    newTile.parent = this.node;

                    const tileComponent = newTile.getComponent(Tile);
                    tileComponent.setCoordinates(x, y);
                    tileComponent.setHeight(this.tilesSize.height - this.tilesSize.height / 10);

                    column.push(tileComponent);
                } catch (error) {
                    console.error(error);
                }
            }
            this.tiles.push(column);
        }
    }
}


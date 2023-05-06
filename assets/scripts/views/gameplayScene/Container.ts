import { _decorator, Button, Component, instantiate, Layout, Node, Prefab, Size, Sprite, SpriteFrame, UITransform } from 'cc';
import { GlobalSettings } from '../../models/GlobalSettings';
import { EventsController } from '../../controllers/EventsController';
import { TilesArray } from '../../utils/TilesArray';
import { Tile } from './Tile';
import { TilesAnimationsHandler } from './TilesAnimationsHandler';
import { TileModel } from '../../models/gameplayScene/TileModel';
import { GameSettings } from '../../models/GameSettings';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;
@ccclass('Container')
export class Container extends Component {
    @property({ type: GameSettings })
    private devSettings: GameSettings | null = null;

    @property({ type: Prefab })
    private tilePrefab: Prefab | null = null;

    @property({ type: EventsController })
    private eventsController: EventsController | null = null;

    @property({ type: Button })
    private blockPanel: Button | null = null;

    private tilesAnimation: TilesAnimationsHandler | null = null;

    private size: number = 0;

    private tiles: Tile[][] = [];
    private tilesSize: Size | null = null;

    protected async start(): Promise<void> {
        if (this.devSettings === null) throw new ErrorMessage('GameSettings').notDefined
        if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded

        this.size = GlobalSettings.getTilesContainerSize() || this.devSettings.getTilesContainerSize();
        this.tilesAnimation = this.getComponent(TilesAnimationsHandler);

        await this.setTilesSize();
        await this.initTiles();

        this.eventsController.getEventTarget().emit('onLoaded');
    }

    public updateTiles(destroyedTiles: { x: number, y: number }[], tilesList: TileModel[][]) {
        if (this.tilesAnimation === null) throw new ErrorMessage('TilesAnimationsHandler').notDefined
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

                if (this.tilesAnimation === null) throw new ErrorMessage('TilesAnimationsHandler').notDefined
                this.tilesAnimation.fallingAnimation(rawDestroyedTiles, tile, y, minY)
            });

        });
        this.scheduleOnce(this.unblockTilesForClick, .55);
    }

    public quickUpdate(changedTiles: { x: number, y: number }[], tilesList: TileModel[][]): void {
        if (this.tilesAnimation === null) throw new ErrorMessage('TilesAnimationsHandler').notDefined

        this.tilesAnimation.destroyAnimation(new TilesArray(changedTiles).getTilesByСoordinates(this.tiles));
        changedTiles.forEach((changedTile: { x: number, y: number }) => {
            this.tiles[changedTile.x][changedTile.y].setSprite(tilesList[changedTile.x][changedTile.y].getId());
        });
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
        if (this.blockPanel === null) throw new ErrorMessage('blockPanel').notDefined
        this.blockPanel.onEnable();
    }

    private unblockTilesForClick() {
        if (this.blockPanel === null) throw new ErrorMessage('blockPanel').notDefined
        this.blockPanel.onDisable();
    }

    private async setTilesSize(): Promise<void> {
        const uiTransform = this.node.getComponent(UITransform);
        const layout = this.node.getComponent(Layout);

        if (uiTransform === null) throw new ErrorMessage('UITransform').notAdded
        if (layout === null) throw new ErrorMessage('Layout').notAdded

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
                if (this.tilePrefab === null) throw new ErrorMessage('Prefab').notDefined

                const newTile = instantiate(this.tilePrefab);
                newTile.name = this.tilePrefab.name + ` (${x}, ${y})`;
                newTile.parent = this.node;

                const tileComponent = newTile.getComponent(Tile);
                if (tileComponent === null) throw new ErrorMessage('Tile').notAdded

                tileComponent.setCoordinates(x, y);

                if (this.tilesSize === null) {
                    throw new Error('Tiles size was not specified');
                } 
                tileComponent.setHeight(this.tilesSize.height - this.tilesSize.height / 10);

                column.push(tileComponent);

            }
            this.tiles.push(column);
        }
    }
}


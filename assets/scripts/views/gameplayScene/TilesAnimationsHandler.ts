import { Component, _decorator } from "cc";
import { Tile } from "./Tile";
import { TileAnimations } from "./TileAnimations";
import { GameSettings } from "../../models/GameSettings";
import { GlobalSettings } from "../../models/GlobalSettings";
const { ccclass, property } = _decorator;
@ccclass('TilesAnimationsHandler')
export class TilesAnimationsHandler extends Component {
    @property({ type: GameSettings })
    private devSettings: GameSettings = null;

    @property
    private tilesFallingHeight: number = 0;
    
    private containerSize: number = 0;

    protected start(): void {
        this.containerSize = GlobalSettings.getTilesContainerSize() || this.devSettings.getTilesContainerSize();
    }

    public fallingAnimation(tilesСoordinates: { x: number, y: number }[], tile: Tile, coordinateY: number, minCoordinateY: number) {
        let firstTopTileY: number = -1;
        let secondTopTileY: number = -1;

        let separatedTileY: number = -1;
        let beforeSeparateTilesY: number = 0;

        tilesСoordinates.forEach((tileСoordinates: { x: number, y: number }, tilesCounter) => {
            if (tileСoordinates.y >= firstTopTileY) {
                let temp: number = firstTopTileY;
                firstTopTileY = tileСoordinates.y;
                secondTopTileY = temp;
            }
            else if (tileСoordinates.y > secondTopTileY) {
                secondTopTileY = tileСoordinates.y;
            }

            if (secondTopTileY >= 0 && firstTopTileY - secondTopTileY > 1) {
                separatedTileY = firstTopTileY;
                beforeSeparateTilesY = tilesCounter;
            }

            const tileAnimations = tile.getComponent(TileAnimations);
            if (coordinateY >= minCoordinateY) {
                if (coordinateY < separatedTileY - 1) {
                    tileAnimations.fallingAnimation(tilesСoordinates.length - (tilesСoordinates.length - beforeSeparateTilesY));
                }
                else if (coordinateY >= this.containerSize - tilesСoordinates.length) {
                    tileAnimations.fallingAnimation(tilesСoordinates.length + this.tilesFallingHeight);
                }
                else {
                    tileAnimations.fallingAnimation(tilesСoordinates.length);
                }
            }
        });
    }

    public destroyAnimation(tiles: Tile[]): void {
        tiles.forEach((tile: Tile) => {
            tile.getComponent(TileAnimations).destroyAnimation();
        });
    }

    public resetAnimation(allTiles: Tile[][],) {
        allTiles.forEach((column: Tile[], x) => {
            column.forEach((tile: Tile, y) => {
                tile.getComponent(TileAnimations).destroyAnimation();
                tile.getComponent(TileAnimations).fallingAnimation(allTiles.length);
            });
        });
    }
}


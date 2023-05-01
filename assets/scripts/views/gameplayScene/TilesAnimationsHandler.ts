import { Tile } from "./Tile";
import { TileAnimations } from "./TileAnimations";

export class TilesAnimationsHandler {
    private tilesСoordinates: { x: number, y: number }[];

    constructor(tilesСoordinates?: { x: number, y: number }[]) {
        this.tilesСoordinates = tilesСoordinates;
    }

    public destroyAnimation(tile: Tile, coordinateY, minCoordinateY) {
        let firstTopTileY: number = -1;
        let secondTopTileY: number = -1;

        let separatedTileY: number = -1;
        let beforeSeparateTilesY: number = 0;

        this.tilesСoordinates.forEach((tileСoordinates: { x: number, y: number }, tilesCounter) => {
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
                    tileAnimations.destroyAnimation(this.tilesСoordinates.length - (this.tilesСoordinates.length - beforeSeparateTilesY));
                }
                else {
                    tileAnimations.destroyAnimation(this.tilesСoordinates.length);
                }
            }
        });
    }

    public resetAnimation(allTiles: Tile[][],) {
        allTiles.forEach((column: Tile[], x) => {
            column.forEach((tile: Tile, y) => {
                tile.getComponent(TileAnimations).destroyAnimation(allTiles.length);
            });
        });
    }
}


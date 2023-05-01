import { TilesArray } from "../../utils/TilesArray";
import { TileModel } from "./TileModel";

export class TilesHandlerModel {
    private tiles: TileModel[][] = [];

    constructor(tiles: TileModel[][]) {
        this.tiles = tiles;
    }

    public getDestroyedTiles(checkingTiles: { x: number, y: number }[] | { x: number, y: number }): { x: number, y: number }[] {
        const finishedTilesList: { x: number, y: number }[] = Array.isArray(checkingTiles)
            ? checkingTiles
            : [checkingTiles]

        let newTiles: { x: number, y: number }[] = [];

        finishedTilesList.forEach((checkingTile: { x: number, y: number }) => {
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
}


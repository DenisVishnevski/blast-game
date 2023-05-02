import { Tile } from "../views/gameplayScene/Tile";

export class TilesArray {
    private tilesСoordinates: { x: number, y: number }[];

    constructor(tilesСoordinates: { x: number, y: number }[]) {
        this.tilesСoordinates = tilesСoordinates;
    }

    public largestToSmallestYSort(): { x: number, y: number }[] {
        this.tilesСoordinates.sort((a: { x: number, y: number }, b: { x: number, y: number }) => {
            if (a.y > b.y) {
                return -1
            }
            return 1
        })
        return this.tilesСoordinates
    }

    public smallestToLargestYSort(): { x: number, y: number }[] {
        this.tilesСoordinates.sort((a: { x: number, y: number }, b: { x: number, y: number }) => {
            if (a.y > b.y) {
                return 1
            }
            return -1
        })
        return this.tilesСoordinates
    }

    public getUniqueTiles(): { x: number, y: number }[] {
        return this.tilesСoordinates.reduce((accumulator, current) => {
            const isUnique: boolean = accumulator.find((find: { x: number, y: number }) =>
                find.x === current.x && find.y === current.y
            );
            return isUnique ? accumulator : [...accumulator, current]
        }, []);
    }

    public getTilesByСoordinates(allTiles: Tile[][]): Tile[] {
        const tilesList: Tile[] = [];
        this.tilesСoordinates.forEach((tileСoordinates: { x: number, y: number }) => {
            tilesList.push(allTiles[tileСoordinates.x][tileСoordinates.y]);
        });
        return tilesList
    }
}


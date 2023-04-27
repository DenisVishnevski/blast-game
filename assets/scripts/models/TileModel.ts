export class TileModel {
    private id: number = 0;

    // private position: { x: number, y: number } = {
    //     x: 0,
    //     y: 0
    // }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    // public setPosition(x: number, y: number): void {
    //     this.position = { x, y }
    // }
}


import { _decorator, Node, Vec3 } from 'cc';
import { Tile } from './Tile';
const { ccclass, property } = _decorator;

@ccclass('TileAnimations')
export class TileAnimations extends Tile {
    @property
    private fallingSpeed : number = 0;

    @property
    private accelerationFactor: number = 0;

    @property
    private pauseTimeBeforeFalling: number = 0;

    private isAnimation: boolean = false
    private zeroPosition: Vec3 = null;
    private fallingAcceleration = 1;

    protected update(dt: number): void {
        if (this.zeroPosition ) {
            if (this.node.getPosition().y > this.zeroPosition.y) {
                if (this.isAnimation) {
                    const newPositionY = this.node.position.y - this.fallingSpeed * 100 * this.fallingAcceleration * dt;
                    this.node.setPosition(this.zeroPosition.x, newPositionY);
                    this.fallingAcceleration += this.accelerationFactor;
                }
            }
            else  {
                this.node.setPosition(this.zeroPosition);
                this.isAnimation = false;
                this.fallingAcceleration = 1;
            }
        }
    }

    public destroyAnimation(destroyedTilesCount: number): void {
        if (this.zeroPosition === null) {
            this.zeroPosition = this.node.getPosition();
        }

        this.node.setPosition(this.zeroPosition.x, this.zeroPosition.y + Tile.height * destroyedTilesCount);
        this.fallingAnimation();
    }

    private fallingAnimation(): void {
        this.scheduleOnce(() => {
            this.isAnimation = true;
        }, this.pauseTimeBeforeFalling);
    }
}


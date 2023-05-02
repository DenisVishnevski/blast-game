import { _decorator, find, instantiate, Node, ParticleSystem2D, Prefab, SpriteFrame, Vec3 } from 'cc';
import { Tile } from './Tile';
const { ccclass, property } = _decorator;

@ccclass('TileAnimations')
export class TileAnimations extends Tile {
    @property({ type: Prefab })
    private destroyEffect: Prefab = null;

    @property
    private fallingSpeed: number = 0;

    @property
    private accelerationFactor: number = 0;

    @property
    private pauseTimeBeforeFalling: number = 0;

    private canvas: Node;

    private isAnimation: boolean = false
    private isEffect: boolean = false
    private zeroPosition: Vec3 = null;
    private fallingAcceleration = 1;

    protected start(): void {
        this.canvas = find('View/Canvas');
    }

    protected update(dt: number): void {
        if (this.zeroPosition) {
            if (this.node.getPosition().y > this.zeroPosition.y) {
                if (this.isAnimation) {
                    const newPositionY = this.node.position.y - this.fallingSpeed * 100 * this.fallingAcceleration * dt;
                    this.node.setPosition(this.zeroPosition.x, newPositionY);
                    this.fallingAcceleration += this.accelerationFactor;
                }
            }
            else {
                this.node.setPosition(this.zeroPosition);
                this.isAnimation = false;
                this.fallingAcceleration = 1;
            }
        }
    }

    public fallingAnimation(destroyedTilesCount: number): void {
        if (this.zeroPosition === null) {
            this.zeroPosition = this.node.getPosition();
        }
        this.node.setPosition(this.zeroPosition.x, this.zeroPosition.y + Tile.height * destroyedTilesCount);

        this.scheduleOnce(() => {
            this.isAnimation = true;
        }, this.pauseTimeBeforeFalling);
    }

    public destroyAnimation(): void {
        if (this.isEffect === false) {
            this.isEffect = true
            
            const newEffect = instantiate(this.destroyEffect);
            const effectSprite: SpriteFrame = this.getComponent(Tile).sprite
            newEffect.getComponent(ParticleSystem2D).spriteFrame = effectSprite;
            newEffect.parent = this.canvas;
            newEffect.setWorldPosition(this.node.getWorldPosition())
        }
        this.scheduleOnce(() => {
            this.isEffect = false
        }, .55)
    }
}


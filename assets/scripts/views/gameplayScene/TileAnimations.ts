import { _decorator, find, instantiate, Node, ParticleSystem2D, Prefab, SpriteFrame, Vec3 } from 'cc';
import { Tile } from './Tile';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('TileAnimations')
export class TileAnimations extends Tile {
    @property({ type: Prefab })
    private destroyEffect: Prefab | null = null;

    @property
    private fallingSpeed: number = 0;

    @property
    private accelerationFactor: number = 0;

    @property
    private pauseTimeBeforeFalling: number = 0;

    private canvas: Node | null = null;

    private isAnimation: boolean = false
    private isEffect: boolean = false
    private zeroPosition: Vec3 | null = null;
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

            if (this.destroyEffect === null) throw new ErrorMessage('Prefab').notAdded
            const newEffect = instantiate(this.destroyEffect);

            const tile = this.getComponent(Tile);
            if (tile === null) throw new ErrorMessage('Tile').notAdded
            
            const effectSprite: SpriteFrame = tile.getSprite()

            const particleSystem2D = newEffect.getComponent(ParticleSystem2D);
            if (particleSystem2D === null) throw new ErrorMessage('ParticleSystem2D').notAdded

            particleSystem2D.spriteFrame = effectSprite;
            newEffect.parent = this.canvas;
            newEffect.setWorldPosition(this.node.getWorldPosition())
        }
        this.scheduleOnce(() => {
            this.isEffect = false
        }, .55)
    }
}


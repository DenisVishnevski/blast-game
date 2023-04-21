import { _decorator, Component, find, Node, Sprite } from 'cc';
import { TilesSprites } from './TilesSprites';
const { ccclass, property } = _decorator;

@ccclass('Tile')
export class Tile extends Component {
    public setSprite(spritesId: number): void {
        const tilesSprites = find('View/Canvas/TilesSprites').getComponent(TilesSprites);

        try {
            this.node.getComponent(Sprite).spriteFrame = tilesSprites.getSpritesList()[spritesId];
        } catch (error) {
            console.error(error);
        }
    }
}


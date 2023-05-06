import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('TilesSpritesList')
export class TilesSpritesList extends Component {
    private spritesList: SpriteFrame[] = [];

    private isLoaded: boolean = false;

    protected async start(): Promise<void> {
        await this.initSprites();
        this.isLoaded = true;
    }

    public getSpritesList(): SpriteFrame[] {
        if (this.isLoaded) {
            return this.spritesList
        }
        return []
    }

    private async initSprites(): Promise<void> {
        let counter = 0;
        while (true) {
            const newSpriteNode = this.node.getChildByName(counter.toString());

            if (newSpriteNode) {
                const newSprite = newSpriteNode.getComponent(Sprite);
                if (newSprite === null) throw new ErrorMessage('Sprite').notAdded

                const newSpriteFrame = newSprite.spriteFrame;
                if (newSpriteFrame === null) throw new Error('The Sprite component does not have a sprite frame');

                this.spritesList.push(newSpriteFrame);
                counter++;
            }
            else {
                break
            }
        }
    }
}


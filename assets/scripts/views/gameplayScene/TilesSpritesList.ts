import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
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
            const newSprite = this.node.getChildByName(counter.toString());

            if (newSprite) {
                this.spritesList.push(newSprite.getComponent(Sprite).spriteFrame);
                counter++;
            }
            else {
                break
            }
        }
    }
}


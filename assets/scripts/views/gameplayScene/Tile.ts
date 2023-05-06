import { _decorator, Component, find, Node, Sprite, SpriteFrame } from 'cc';
import { EventsController } from '../../controllers/EventsController';
import { TilesSpritesList } from './TilesSpritesList';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('Tile')
export class Tile extends Component {
    protected static height: number;
    private eventsController: EventsController | null = null;

    private spriteFrame: SpriteFrame | null = null;
    private coordinates: { x: number, y: number } = {
        x: 0,
        y: 0
    }

    protected start(): void {
        const controller = find('Controller');
        if (controller === null) throw new ErrorMessage('Controller').notFound
        this.eventsController = controller.getComponent(EventsController);

    }

    public setCoordinates(x: number, y: number): void {
        this.coordinates = { x, y }
    }

    public setHeight(height: number) {
        Tile.height = height;
    }

    public getSprite(): SpriteFrame {
        if (this.spriteFrame === null) {
            throw new Error('Sprite frame was not specified');
        }
        return this.spriteFrame
    }

    public setSprite(spritesId: number): void {
        const tilesSpritesListNode = find('View/Canvas/TilesSpritesList');
        if (tilesSpritesListNode === null) throw new ErrorMessage('Controller').notFound

        const spritesList = tilesSpritesListNode.getComponent(TilesSpritesList);
        if (spritesList === null) throw new ErrorMessage('TilesSpritesList').notAdded

        const newSpriteFrame = spritesList.getSpritesList()[spritesId];

        const sprite = this.node.getComponent(Sprite)
        if (sprite === null) throw new ErrorMessage('Sprite').notAdded

        sprite.spriteFrame = newSpriteFrame;
        this.spriteFrame = newSpriteFrame;
    }

    private onClick(): void {
        if (this.eventsController === null) throw new ErrorMessage('Controller').notFound
        this.eventsController.getEventTarget().emit('onTileClick', this.coordinates)
    }
}


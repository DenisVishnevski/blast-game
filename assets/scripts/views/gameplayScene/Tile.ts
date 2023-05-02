import { _decorator, Component, find, Node, Sprite, SpriteFrame } from 'cc';
import { EventsController } from '../../controllers/EventsController';
import { TilesSpritesList } from './TilesSpritesList';
const { ccclass, property } = _decorator;

@ccclass('Tile')
export class Tile extends Component {
    protected static height: number;
    private eventsController: EventsController;

    public sprite: SpriteFrame = null;
    private coordinates: { x: number, y: number } = {
        x: 0,
        y: 0
    }

    protected start(): void {
        this.eventsController = find('Controller').getComponent(EventsController);
        
    }

    public setCoordinates(x: number, y: number): void {
        this.coordinates = { x, y }
    }

    public setHeight(height: number) {
        Tile.height = height;
    }

    public setSprite(spritesId: number): void {
        const spritesList = find('View/Canvas/TilesSpritesList').getComponent(TilesSpritesList);
        const newSprite = spritesList.getSpritesList()[spritesId];
        try {
            this.node.getComponent(Sprite).spriteFrame = newSprite;
            this.sprite = newSprite;
            
        } catch (error) {
            console.error(error);
        }
    }

    private onClick(): void {
        this.eventsController.getEventTarget().emit('onTileClick', this.coordinates)
    }
}


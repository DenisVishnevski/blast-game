import { _decorator, Component, find, Node, Size, Sprite } from 'cc';
import { EventsController } from '../../controllers/EventsController';
import { TilesSpritesList } from './TilesSpritesList';
const { ccclass, property } = _decorator;

@ccclass('Tile')
export class Tile extends Component {
    protected static height: number;
    private eventsController: EventsController;
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

        try {
            this.node.getComponent(Sprite).spriteFrame = spritesList.getSpritesList()[spritesId];
        } catch (error) {
            console.error(error);
        }
    }

    private onClick(): void {
        this.eventsController.getEventTarget().emit('onTileClick', this.coordinates)
    }
}


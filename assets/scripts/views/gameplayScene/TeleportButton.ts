import { _decorator, Component, EventMouse, Input, Node, Sprite } from 'cc';
import { BonusesController } from '../../controllers/gameplayScene/BonusesController';
import { BonusesPanel } from './BonusesPanel';
import { DragAndDropLogic } from './DragAndDropLogic';
import { Tile } from './Tile';
import { TilesSpritesList } from './TilesSpritesList';
const { ccclass, property } = _decorator;

@ccclass('TeleportButton')
export class TeleportButton extends Component {
    @property({ type: BonusesController })
    private bonusesController: BonusesController = null;

    @property({ type: BonusesPanel })
    private bonusesPanel: BonusesPanel = null;

    @property({ type: Node })
    private canvas: Node = null;

    @property({ type: TilesSpritesList })
    private tilesSpritesList: TilesSpritesList = null;

    @property({ type: Sprite })
    private tileIcon: Sprite = null;

    private dragAndDropLogic: DragAndDropLogic = null;
    private isDroped: boolean = true;

    protected onLoad(): void {
        this.dragAndDropLogic = this.getComponent(DragAndDropLogic);
    }

    public displayTile(tileId: number): void {
        this.tileIcon.enabled = true;
        this.tileIcon.spriteFrame = this.tilesSpritesList.getSpritesList()[tileId];
    }

    private hideTile(): void {
        this.tileIcon.enabled = false;
    }

    private takeTeleport(): void {
        if (this.bonusesPanel.getTeleportsCount() > 0 && this.isDroped) {
            this.isDroped = false;
            this.dragAndDropLogic.drag();
            this.bonusesController.useTeleport();

            this.scheduleOnce(() => {
                this.canvas.on(Input.EventType.MOUSE_UP, this.dropTeleportHandler, this);
            }, .2)
        }
    }

    private dropTeleportHandler(event: EventMouse): void {
        if (this.isDroped === false) {
            if (event.target.getComponent(Tile) === null) {
                this.dropTeleport();
            }
        }
    }

    public dropTeleport(): void {
        this.isDroped = true;
        this.hideTile();
        this.bonusesController.cancelTeleport()
        this.canvas.off(Input.EventType.MOUSE_UP, this.dropTeleportHandler, this);
        this.dragAndDropLogic.drop();
        this.bonusesController.runDefaultScript();
    }
}


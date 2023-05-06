import { _decorator, Component, EventMouse, Input, Node, Sprite } from 'cc';
import { BonusesController } from '../../controllers/gameplayScene/BonusesController';
import { BonusesPanel } from './BonusesPanel';
import { DragAndDropLogic } from './DragAndDropLogic';
import { Tile } from './Tile';
import { TilesSpritesList } from './TilesSpritesList';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('TeleportButton')
export class TeleportButton extends Component {
    @property({ type: BonusesController })
    private bonusesController: BonusesController | null = null;

    @property({ type: BonusesPanel })
    private bonusesPanel: BonusesPanel | null = null;

    @property({ type: Node })
    private canvas: Node | null = null;

    @property({ type: TilesSpritesList })
    private tilesSpritesList: TilesSpritesList | null = null;

    @property({ type: Sprite })
    private tileIcon: Sprite | null = null;

    private dragAndDropLogic: DragAndDropLogic | null = null;
    private isDroped: boolean = true;

    protected onLoad(): void {
        this.dragAndDropLogic = this.getComponent(DragAndDropLogic);
    }

    public displayTile(tileId: number): void {
        if (this.tileIcon === null) throw new ErrorMessage('Sprite').notDefined
        if (this.tilesSpritesList === null) throw new ErrorMessage('TilesSpritesList').notDefined

        this.tileIcon.enabled = true;
        this.tileIcon.spriteFrame = this.tilesSpritesList.getSpritesList()[tileId];
    }

    private hideTile(): void {
        if (this.tileIcon === null) throw new ErrorMessage('Sprite').notDefined
        this.tileIcon.enabled = false;
    }

    private takeTeleport(): void {
        if (this.bonusesPanel === null) throw new ErrorMessage('BonusesPanel').notDefined
        if (this.dragAndDropLogic === null) throw new ErrorMessage('DragAndDropLogic').notDefined
        if (this.bonusesController === null) throw new ErrorMessage('BonusesController').notDefined

        if (this.bonusesPanel.getTeleportsCount() > 0 && this.isDroped) {
            this.isDroped = false;
            this.dragAndDropLogic.drag();
            this.bonusesController.useTeleport();

            this.scheduleOnce(() => {
                if (this.canvas === null) throw new ErrorMessage('canvas').notDefined
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
        if (this.bonusesPanel === null) throw new ErrorMessage('BonusesPanel').notDefined
        if (this.dragAndDropLogic === null) throw new ErrorMessage('DragAndDropLogic').notDefined
        if (this.bonusesController === null) throw new ErrorMessage('BonusesController').notDefined
        if (this.canvas === null) throw new ErrorMessage('canvas').notDefined

        this.isDroped = true;
        this.hideTile();
        this.bonusesController.cancelTeleport()
        this.canvas.off(Input.EventType.MOUSE_UP, this.dropTeleportHandler, this);
        this.dragAndDropLogic.drop();
        this.bonusesController.runDefaultScript();
    }
}


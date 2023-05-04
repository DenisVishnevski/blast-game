import { _decorator, Component, Input, Node } from 'cc';
import { DragAndDropLogic } from './DragAndDropLogic';
import { BonusesController } from '../../controllers/gameplayScene/BonusesController';
import { BonusesPanel } from './BonusesPanel';
const { ccclass, property } = _decorator;

@ccclass('BombButton')
export class BombButton extends Component {
    @property({ type: BonusesController })
    private bonusesController: BonusesController = null;

    @property({ type: BonusesPanel })
    private bonusesPanel: BonusesPanel = null;

    @property({ type: Node })
    private canvas: Node = null;

    private dragAndDropLogic: DragAndDropLogic = null;
    private isDroped: boolean = true;

    protected start(): void {
        this.dragAndDropLogic = this.getComponent(DragAndDropLogic);
    }

    private takeBomb(): void {
        if (this.bonusesPanel.getBombsCount() > 0 && this.isDroped) {
            this.isDroped = false;
            this.dragAndDropLogic.drag();
            this.bonusesController.useBomb();

            this.scheduleOnce(() => {
                this.canvas.on(Input.EventType.MOUSE_UP, this.dropBomb, this);
            }, .2)
        }
    }

    private dropBomb(): void {
        if (this.isDroped === false) {
            this.isDroped = true;
            this.canvas.off(Input.EventType.MOUSE_UP, this.dropBomb, this);
            this.dragAndDropLogic.drop();
            this.bonusesController.runDefaultScript();
        }
    }
}


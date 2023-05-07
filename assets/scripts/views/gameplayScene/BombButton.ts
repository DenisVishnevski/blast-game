import { _decorator, Component, Input, Node } from 'cc';
import { DragAndDropLogic } from './DragAndDropLogic';
import { BonusesController } from '../../controllers/gameplayScene/BonusesController';
import { BonusesPanel } from './BonusesPanel';
import { ErrorMessage } from '../../utils/ErrorMessage';
import { EventsController } from '../../controllers/EventsController';
const { ccclass, property } = _decorator;

@ccclass('BombButton')
export class BombButton extends Component {
    @property({ type: EventsController })
    private eventsController: EventsController | null = null;

    @property({ type: BonusesPanel })
    private bonusesPanel: BonusesPanel | null = null;

    @property({ type: Node })
    private canvas: Node | null = null;

    private dragAndDropLogic: DragAndDropLogic | null = null;
    private isDroped: boolean = true;

    protected start(): void {
        this.dragAndDropLogic = this.getComponent(DragAndDropLogic);
    }

    private takeBomb(): void {
        if (this.bonusesPanel === null) throw new ErrorMessage('BonusesPanel').notDefined
        if (this.canvas === null) throw new ErrorMessage('canvas').notDefined
        if (this.dragAndDropLogic === null) throw new ErrorMessage('DragAndDropLogic').notDefined

        if (this.bonusesPanel.getBombsCount() > 0 && this.isDroped) {
            this.isDroped = false;
            this.dragAndDropLogic.drag();

            this.scheduleOnce(() => {
                if (this.eventsController === null) throw new ErrorMessage('EventsController').notDefined
                if (this.canvas === null) throw new ErrorMessage('canvas').notDefined
                
                this.eventsController.getEventTarget().emit('onTakeBomb');
                this.canvas.on(Input.EventType.MOUSE_UP, this.dropBomb, this);
            }, .2)
        }
    }

    private dropBomb(): void {
        if (this.eventsController === null) throw new ErrorMessage('EventsController').notDefined
        if (this.canvas === null) throw new ErrorMessage('canvas').notDefined
        if (this.dragAndDropLogic === null) throw new ErrorMessage('DragAndDropLogic').notDefined

        if (this.isDroped === false) {
            this.isDroped = true;
            this.canvas.off(Input.EventType.MOUSE_UP, this.dropBomb, this);
            this.dragAndDropLogic.drop();
            this.eventsController.getEventTarget().emit('onDropBomb');
        }
    }
}


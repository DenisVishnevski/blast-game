import { _decorator, Component, Node } from 'cc';
import { EventsController } from '../../controllers/EventsController';
import { GlobalSettings } from '../GlobalSettings';
import { GameSettings } from '../GameSettings';
const { ccclass, property } = _decorator;

@ccclass('ResetModel')
export class ResetModel extends Component {
    @property({ type: GameSettings })
    private devSettings: GameSettings = null;

    @property({ type: EventsController })
    private eventsController: EventsController = null;

    private autoActuationsCount : number = 1;
    private usesCount : number = 0;

    protected start(): void {
        this.usesCount = GlobalSettings.getResetsCount() || this.devSettings.getResetsCount();
    }

    public use(): void {
        this.usesCount--;
        this.eventsController.getEventTarget().emit('onUseReset', this.usesCount);
    }

    public getUsesCount(): number {
        return this.usesCount 
    }

    public autoActuation(): void {
        this.autoActuationsCount--;
        this.eventsController.getEventTarget().emit('onUseReset', this.usesCount);
    }

    public getAutoActuationsCount(): number {
        return this.autoActuationsCount 
    }
}


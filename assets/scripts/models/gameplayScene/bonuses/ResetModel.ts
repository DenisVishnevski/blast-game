import { _decorator, Component, Node } from 'cc';
import { GameSettings } from '../../GameSettings';
import { EventsController } from '../../../controllers/EventsController';
import { GlobalSettings } from '../../GlobalSettings';
import { IResetBonus } from './IResetBonus';
import { ErrorMessage } from '../../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('ResetModel')
export class ResetModel extends Component implements IResetBonus {
    @property({ type: GameSettings })
    private devSettings: GameSettings | null = null;

    @property({ type: EventsController })
    private eventsController: EventsController | null = null;

    private autoActuationsCount : number = 1;
    private usesCount : number = 0;

    protected start(): void {
        if (this.devSettings === null) {
            throw new ErrorMessage('GameSettings').notDefined
        } 
        this.usesCount = GlobalSettings.getResetsCount() || this.devSettings.getResetsCount();
    }

    public use(): void {
        if (this.eventsController === null) {
            throw new ErrorMessage('EventsController').notDefined
        } 

        this.usesCount--;
        this.eventsController.getEventTarget().emit('onUseReset', this.usesCount);
    }

    public getUsesCount(): number {
        return this.usesCount 
    }

    public autoActuation(): void {
        if (this.eventsController === null) {
            throw new ErrorMessage('EventsController').notDefined
        } 

        this.autoActuationsCount--;
        this.eventsController.getEventTarget().emit('onUseReset', this.usesCount);
    }

    public getAutoActuationsCount(): number {
        return this.autoActuationsCount 
    }

    public restoreAutoActuationsCount(): void {
        this.autoActuationsCount = 1;
    }
}


import { _decorator, Component, Node } from 'cc';
import { GameSettings } from '../../GameSettings';
import { EventsController } from '../../../controllers/EventsController';
import { GlobalSettings } from '../../GlobalSettings';
import { ITeleportBonus } from './ITeleportBonus';
import { ErrorMessage } from '../../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('TeleportModel')
export class TeleportModel extends Component implements ITeleportBonus {
    @property({ type: GameSettings })
    private devSettings: GameSettings | null = null;

    @property({ type: EventsController })
    private eventsController: EventsController | null = null;

    private usesCount : number = 0;

    protected start(): void {
        if (this.devSettings === null) {
            throw new ErrorMessage('GameSettings').notDefined
        }
        this.usesCount = GlobalSettings.getTeleportsCount() || this.devSettings.getTeleportsCount();
    }

    public use(): void {
        if (this.eventsController === null) {
            throw new ErrorMessage('EventsController').notDefined
        } 

        this.usesCount--;
        this.eventsController.getEventTarget().emit('onUseTeleport', this.usesCount);
    }

    public selectTile(tileId: number): void {
        if (this.eventsController === null) {
            throw new ErrorMessage('EventsController').notDefined
        } 

        this.eventsController.getEventTarget().emit('onSelectTile', tileId);
    }

    public getUsesCount(): number {
        return this.usesCount
    }
}


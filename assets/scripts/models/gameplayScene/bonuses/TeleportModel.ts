import { _decorator, Component, Node } from 'cc';
import { GameSettings } from '../../GameSettings';
import { EventsController } from '../../../controllers/EventsController';
import { GlobalSettings } from '../../GlobalSettings';
import { ITeleportBonus } from './ITeleportBonus';
const { ccclass, property } = _decorator;

@ccclass('TeleportModel')
export class TeleportModel extends Component implements ITeleportBonus {
    @property({ type: GameSettings })
    private devSettings: GameSettings = null;

    @property({ type: EventsController })
    private eventsController: EventsController = null;

    private usesCount : number = 0;

    protected start(): void {
        this.usesCount = GlobalSettings.getTeleportsCount() || this.devSettings.getTeleportsCount();
    }

    public use(): void {
        this.usesCount--;
        this.eventsController.getEventTarget().emit('onUseTeleport', this.usesCount);
    }

    public selectTile(tileId: number): void {
        this.eventsController.getEventTarget().emit('onSelectTile', tileId);
    }

    public getUsesCount(): number {
        return this.usesCount
    }
}


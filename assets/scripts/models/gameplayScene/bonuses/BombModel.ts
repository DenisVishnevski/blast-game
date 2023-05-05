import { _decorator, Component, Node } from 'cc';
import { IBonus } from './IBonus';
import { GlobalSettings } from '../../GlobalSettings';
import { GameSettings } from '../../GameSettings';
import { EventsController } from '../../../controllers/EventsController';
import { IBombBonus } from './IBombBonus';
const { ccclass, property } = _decorator;

@ccclass('BombModel')
export class BombModel extends Component implements IBombBonus {
    @property({ type: GameSettings })
    private devSettings: GameSettings = null;

    @property({ type: EventsController })
    private eventsController: EventsController = null;

    @property
    private range: number = 0

    private usesCount : number = 0;

    protected start(): void {
        this.usesCount = GlobalSettings.getBombsCount() || this.devSettings.getBombsCount();
    }

    public use(): void {
        this.usesCount--;
        this.eventsController.getEventTarget().emit('onUseBomb', this.usesCount);
    }

    public getRange(): number {
        return this.range
    }

    public getUsesCount(): number {
        return this.usesCount
    }
}


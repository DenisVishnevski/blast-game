import { _decorator, Component, Node } from 'cc';
import { IBonus } from './IBonus';
import { GlobalSettings } from '../../GlobalSettings';
import { GameSettings } from '../../GameSettings';
import { EventsController } from '../../../controllers/EventsController';
const { ccclass, property } = _decorator;

@ccclass('BombModel')
export class BombModel extends Component implements IBonus {
    @property({ type: GameSettings })
    private devSettings: GameSettings = null;

    @property({ type: EventsController })
    private eventsController: EventsController = null;

    private usesCount : number = 0;

    protected start(): void {
        this.usesCount = GlobalSettings.getBombsCount() || this.devSettings.getBombsCount();
    }

    public use(): void {
        this.usesCount--;
        this.eventsController.getEventTarget().emit('onUseBomb', this.usesCount);
    }

    public getUsesCount(): number {
        return this.usesCount
    }
}


import { _decorator, Component, Node } from 'cc';
import { IBonus } from './IBonus';
import { GlobalSettings } from '../../GlobalSettings';
import { GameSettings } from '../../GameSettings';
import { EventsController } from '../../../controllers/EventsController';
import { IBombBonus } from './IBombBonus';
import { ErrorMessage } from '../../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('BombModel')
export class BombModel extends Component implements IBombBonus {
    @property({ type: GameSettings })
    private devSettings: GameSettings | null = null;

    @property({ type: EventsController })
    private eventsController: EventsController | null = null;

    @property
    private range: number = 0

    private usesCount : number = 0;

    protected start(): void {
        if (this.devSettings === null) {
            throw new ErrorMessage('GameSettings').notDefined
        } 
        this.usesCount = GlobalSettings.getBombsCount() || this.devSettings.getBombsCount();
    }

    public use(): void {
        if (this.eventsController === null) {
            throw new ErrorMessage('EventsController').notDefined
        } 

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


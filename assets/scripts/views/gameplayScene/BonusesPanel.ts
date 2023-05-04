import { _decorator, Component, Label, Node } from 'cc';
import { GlobalSettings } from '../../models/GlobalSettings';
import { GameSettings } from '../../models/GameSettings';
const { ccclass, property } = _decorator;

@ccclass('BonusesPanel')
export class BonusesPanel extends Component {
    @property({ type: GameSettings })
    private devSettings: GameSettings = null;

    @property({ type: Label})
    private bombsCounter: Label = null;

    @property({ type: Label})
    private resetsCounter: Label = null;

    private bombsCount: number = 0;

    protected start(): void {
        this.setBombsCount(GlobalSettings.getBombsCount() || this.devSettings.getBombsCount());
        this.setResetsCount(GlobalSettings.getResetsCount() || this.devSettings.getResetsCount());
    }

    public getBombsCount(): number {
        return this.bombsCount
    }

    public setBombsCount(count: number): void {
        this.bombsCount = count;
        this.bombsCounter.string = count.toString();
    }

    public setResetsCount(count: number): void {
        this.resetsCounter.string = count.toString();
    }
}


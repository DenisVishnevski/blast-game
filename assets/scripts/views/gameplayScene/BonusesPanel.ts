import { _decorator, Component, Label, Node } from 'cc';
import { GlobalSettings } from '../../models/GlobalSettings';
import { GameSettings } from '../../models/GameSettings';
const { ccclass, property } = _decorator;

@ccclass('BonusesPanel')
export class BonusesPanel extends Component {
    @property({ type: GameSettings })
    private devSettings: GameSettings = null;

    @property({ type: Label})
    private resetsCounter: Label = null;

    protected start(): void {
        this.setResetsCount(GlobalSettings.getResetsCount() || this.devSettings.getResetsCount());
    }

    public setResetsCount(resetsCount: number): void {
        this.resetsCounter.string = resetsCount.toString();
    }
}


import { _decorator, Component, Label, Node } from 'cc';
import { GlobalSettings } from '../../models/GlobalSettings';
import { GameSettings } from '../../models/GameSettings';
const { ccclass, property } = _decorator;

@ccclass('InformationPanel')
export class InformationPanel extends Component {
    @property({ type: GameSettings })
    private devSettings: GameSettings = null;

    @property({type: Label})
    private clicksCounter: Label = null;

    @property({type: Label})
    private pointsCounter: Label = null;

    protected start(): void {
        this.setClicksCount(GlobalSettings.getClicksCount() || this.devSettings.getClicksCount());
        this.setPointsCount(0);
    }
   
    public setClicksCount(clicksCount: number): void {
        this.clicksCounter.string = clicksCount.toString();
    }

    public setPointsCount(pointsCount: number): void {
        this.pointsCounter.string = `${pointsCount.toString()}/${GlobalSettings.getTotalPointsCount() || this.devSettings.getTotalPointsCount()}`
    }
}


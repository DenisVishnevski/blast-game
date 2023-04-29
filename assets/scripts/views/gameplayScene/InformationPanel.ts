import { _decorator, Component, Label, Node } from 'cc';
import { GlobalSettings } from '../../models/GlobalSettings';
const { ccclass, property } = _decorator;

@ccclass('InformationPanel')
export class InformationPanel extends Component {
    @property({ type: GlobalSettings })
    private globalSettings: GlobalSettings = null;

    @property({type: Label})
    private clicksCounter: Label = null;

    @property({type: Label})
    private pointsCounter: Label = null;

    protected start(): void {
        this.setClicksCount(this.globalSettings.getClicksCount());
        this.setPointsCount(0);
    }
   
    public setClicksCount(clicksCount: number): void {
        this.clicksCounter.string = clicksCount.toString();
    }

    public setPointsCount(pointsCount: number): void {
        this.pointsCounter.string = `${pointsCount.toString()}/${this.globalSettings.getTotalPointsCount()}`
    }
}


import { _decorator, Component, Label, Node } from 'cc';
import { DevSettings } from '../../models/DevSettings';
import { GlobalSettings } from '../../models/GlobalSettings';
import { IDifficultySetting } from '../../models/IDifficultySetting';
const { ccclass, property } = _decorator;

@ccclass('InformationPanel')
export class InformationPanel extends Component {
    @property({ type: DevSettings })
    private devSettings: IDifficultySetting = null;

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


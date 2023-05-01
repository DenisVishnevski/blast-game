import { _decorator, Component, Label, Node } from 'cc';
import { GlobalSettings } from '../../models/GlobalSettings';
import { DevSettings } from '../../models/DevSettings';
import { IDifficultySetting } from '../../models/IDifficultySetting';
const { ccclass, property } = _decorator;

@ccclass('BonusesPanel')
export class BonusesPanel extends Component {
    @property({ type: DevSettings })
    private devSettings: IDifficultySetting = null;

    @property({ type: Label})
    private resetsCounter: Label = null;

    protected start(): void {
        this.setResetsCount(GlobalSettings.getResetsCount() || this.devSettings.getResetsCount());
    }

    public setResetsCount(resetsCount: number): void {
        this.resetsCounter.string = resetsCount.toString();
    }
}


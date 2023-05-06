import { _decorator, Component, Label, Node } from 'cc';
import { GlobalSettings } from '../../models/GlobalSettings';
import { GameSettings } from '../../models/GameSettings';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('InformationPanel')
export class InformationPanel extends Component {
    @property({ type: GameSettings })
    private devSettings: GameSettings | null = null;

    @property({ type: Label })
    private clicksCounter: Label | null = null;

    @property({ type: Label })
    private pointsCounter: Label | null = null;

    protected start(): void {
        if (this.devSettings === null) {
            throw new ErrorMessage('GameSettings').notDefined
        }

        this.setClicksCount(GlobalSettings.getClicksCount() || this.devSettings.getClicksCount());
        this.setPointsCount(0);
    }

    public setClicksCount(clicksCount: number): void {
        if (this.clicksCounter === null) {
            throw new ErrorMessage('Label').notDefined
        }
        this.clicksCounter.string = clicksCount.toString();
    }

    public setPointsCount(pointsCount: number): void {
        if (this.pointsCounter === null) throw new ErrorMessage('Label').notDefined
        if (this.devSettings === null) throw new ErrorMessage('GameSettings').notDefined

        this.pointsCounter.string = `${pointsCount.toString()}/${GlobalSettings.getTotalPointsCount() || this.devSettings.getTotalPointsCount()}`
    }
}


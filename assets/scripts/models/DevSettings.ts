import { _decorator, Component, Node } from 'cc';
import { IDifficultySetting } from './IDifficultySetting';
const { ccclass, property } = _decorator;

@ccclass('DevSettings')
export class DevSettings extends Component implements IDifficultySetting {
    @property
    private tilesContainerSize: number = 0;

    @property
    private clicksCount: number = 0;

    @property
    private totalPointsCount: number = 0;

    @property
    private resetsCount: number = 0;

    public getTilesContainerSize(): number {
        return this.tilesContainerSize
    }

    public getClicksCount(): number {
        return this.clicksCount
    }

    public getTotalPointsCount(): number {
        return this.totalPointsCount
    }

    public getResetsCount(): number {
        return this.resetsCount
    }
}


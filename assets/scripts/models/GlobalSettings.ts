import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GlobalSettings')
export class GlobalSettings extends Component {
    @property
    private localTilesContainerSize: number = 0

    @property
    private clicksCount: number = 0;

    @property
    private totalPointsCount: number = 0

    private static tilesContainerSize: number = 0

    public getLocalTilesContainerSize(): number {
        return this.localTilesContainerSize
    }

    public static getTilesContainerSize(): number {
        return GlobalSettings.tilesContainerSize
    }

    public static setTilesContainerSize(tilesContainerSize: number): void {
        this.tilesContainerSize = tilesContainerSize;
    }

    public getClicksCount(): number {
        return this.clicksCount
    }

    public getTotalPointsCount(): number {
        return this.totalPointsCount
    }
}


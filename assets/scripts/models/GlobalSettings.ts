import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GlobalSettings')
export class GlobalSettings extends Component {
    private static tilesContainerSize: number = 0
    private static clicksCount: number = 0;
    private static totalPointsCount: number = 0

    private static resetsCount: number = 0

    public static getTilesContainerSize(): number {
        return GlobalSettings.tilesContainerSize
    }

    public static setTilesContainerSize(tilesContainerSize: number): void {
        this.tilesContainerSize = tilesContainerSize;
    }

    public static getClicksCount(): number {
        return GlobalSettings.clicksCount
    }

    public static setClicksCount(clicksCount: number): void {
        this.clicksCount = clicksCount;
    }

    public static getTotalPointsCount(): number {
        return GlobalSettings.totalPointsCount
    }

    public static setTotalPointsCount(totalPointsCount: number): void {
        this.totalPointsCount = totalPointsCount;
    }

    public static getResetsCount(): number {
        return GlobalSettings.resetsCount
    }

    public static setResetsCount(resetsCount: number): void {
        this.resetsCount = resetsCount;
    }
}


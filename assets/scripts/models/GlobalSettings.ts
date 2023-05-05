import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GlobalSettings')
export class GlobalSettings extends Component {
    private static tilesContainerSize: number = 0
    private static clicksCount: number = 0;
    private static totalPointsCount: number = 0

    private static bombsCount: number = 0
    private static teleportsCount: number = 0
    private static resetsCount: number = 0

    public static getTilesContainerSize(): number {
        return this.tilesContainerSize
    }

    public static setTilesContainerSize(count: number): void {
        this.tilesContainerSize = count;
    }

    public static getClicksCount(): number {
        return this.clicksCount
    }

    public static setClicksCount(count: number): void {
        this.clicksCount = count;
    }

    public static getTotalPointsCount(): number {
        return this.totalPointsCount
    }

    public static setTotalPointsCount(count: number): void {
        this.totalPointsCount = count;
    }

    public static getBombsCount(): number {
        return this.bombsCount
    }

    public static setBombsCount(count: number): void {
        this.bombsCount = count;
    }

    public static getTeleportsCount(): number {
        return this.teleportsCount
    }

    public static setTeleportsCount(count: number): void {
        this.teleportsCount = count;
    }

    public static getResetsCount(): number {
        return this.resetsCount
    }

    public static setResetsCount(count: number): void {
        this.resetsCount = count;
    }
}


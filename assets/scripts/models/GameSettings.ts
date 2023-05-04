import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameSettings')
export class GameSettings extends Component {
    @property
    private tilesContainerSize: number = 0;

    @property
    private clicksCount: number = 0;

    @property
    private totalPointsCount: number = 0;

    @property
    private bombsCount: number = 0;

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

    public getBombsCount(): number {
        return this.bombsCount
    }

    public getResetsCount(): number {
        return this.resetsCount
    }
}


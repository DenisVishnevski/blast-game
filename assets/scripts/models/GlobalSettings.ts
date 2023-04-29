import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GlobalSettings')
export class GlobalSettings extends Component {
    private static tilesContainerSize: number = 7
    
    public static getTilesContainerSize() {
        return GlobalSettings.tilesContainerSize
    }

    public static setTilesContainerSize(tilesContainerSize: number) {
        this.tilesContainerSize = tilesContainerSize;
    }
}


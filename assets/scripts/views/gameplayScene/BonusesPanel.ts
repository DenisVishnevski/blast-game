import { _decorator, Component, Label } from 'cc';
import { GlobalSettings } from '../../models/GlobalSettings';
import { GameSettings } from '../../models/GameSettings';
import { TilesSpritesList } from './TilesSpritesList';
import { TeleportButton } from './TeleportButton';
const { ccclass, property } = _decorator;

@ccclass('BonusesPanel')
export class BonusesPanel extends Component {
    @property({ type: GameSettings })
    private devSettings: GameSettings = null;

    @property({ type: Label})
    private bombsCounter: Label = null;

    @property({ type: Label})
    private teleportsCounter: Label = null;

    @property({ type: Label})
    private resetsCounter: Label = null;

    @property({ type: TeleportButton })
    private teleportButton: TeleportButton = null;

    private bombsCount: number = 0;
    private teleportsCount: number = 0;

    protected start(): void {
        this.setBombsCount(GlobalSettings.getBombsCount() || this.devSettings.getBombsCount());
        this.setTeleportsCount(GlobalSettings.getTeleportsCount() || this.devSettings.getTeleportsCount());
        this.setResetsCount(GlobalSettings.getResetsCount() || this.devSettings.getResetsCount());
    }

    public getBombsCount(): number {
        return this.bombsCount
    }

    public setBombsCount(count: number): void {
        this.bombsCount = count;
        this.bombsCounter.string = count.toString();
    }

    public displayTile(tileId: number): void {
        this.teleportButton.displayTile(tileId);
    }

    public getTeleportsCount(): number {
        return this.teleportsCount
    }

    public setTeleportsCount(count: number): void {
        this.teleportsCount = count;
        this.teleportsCounter.string = count.toString();
        this.teleportButton.dropTeleport();
    }

    public setResetsCount(count: number): void {
        this.resetsCounter.string = count.toString();
    }
}


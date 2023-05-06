import { _decorator, Component, Label } from 'cc';
import { GlobalSettings } from '../../models/GlobalSettings';
import { GameSettings } from '../../models/GameSettings';
import { TilesSpritesList } from './TilesSpritesList';
import { TeleportButton } from './TeleportButton';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('BonusesPanel')
export class BonusesPanel extends Component {
    @property({ type: GameSettings })
    private devSettings: GameSettings | null = null;

    @property({ type: Label})
    private bombsCounter: Label | null = null;

    @property({ type: Label})
    private teleportsCounter: Label | null = null;

    @property({ type: Label})
    private resetsCounter: Label | null = null;

    @property({ type: TeleportButton })
    private teleportButton: TeleportButton | null = null;

    private bombsCount: number = 0;
    private teleportsCount: number = 0;

    protected start(): void {
        if (this.devSettings === null) throw new ErrorMessage('GameSettings').notDefined

        this.setBombsCount(GlobalSettings.getBombsCount() || this.devSettings.getBombsCount());
        this.setTeleportsCount(GlobalSettings.getTeleportsCount() || this.devSettings.getTeleportsCount());
        this.setResetsCount(GlobalSettings.getResetsCount() || this.devSettings.getResetsCount());
    }

    public getBombsCount(): number {
        return this.bombsCount
    }

    public setBombsCount(count: number): void {
        if (this.bombsCounter === null) throw new ErrorMessage('Label').notDefined

        this.bombsCount = count;
        this.bombsCounter.string = count.toString();
    }

    public displayTile(tileId: number): void {
        if (this.teleportButton === null) throw new ErrorMessage('TeleportButton').notDefined
        this.teleportButton.displayTile(tileId);
    }

    public getTeleportsCount(): number {
        return this.teleportsCount
    }

    public setTeleportsCount(count: number): void {
        if (this.teleportsCounter === null) throw new ErrorMessage('Label').notDefined
        if (this.teleportButton === null) throw new ErrorMessage('TeleportButton').notDefined

        this.teleportsCount = count;
        this.teleportsCounter.string = count.toString();
        this.teleportButton.dropTeleport();
    }

    public setResetsCount(count: number): void {
        if (this.resetsCounter === null) throw new ErrorMessage('Label').notDefined
        this.resetsCounter.string = count.toString();
    }
}


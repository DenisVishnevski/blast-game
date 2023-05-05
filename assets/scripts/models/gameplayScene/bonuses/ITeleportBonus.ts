import { IBonus } from './IBonus';

export interface ITeleportBonus extends IBonus {
    selectTile(tileId: number): void;
}
import { IBonus } from "./IBonus";

export interface IResetBonus extends IBonus {
    autoActuation(): void;

    getAutoActuationsCount(): number;

    restoreAutoActuationsCount(): void
}


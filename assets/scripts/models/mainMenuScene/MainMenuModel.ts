import { _decorator, Component, Node } from 'cc';
import { GameSettings } from '../GameSettings';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;
@ccclass('MainMenuModel')
export class MainMenuModel extends Component {
    @property({type: GameSettings})
    private easyDifficultyLevel: GameSettings | null = null

    @property({type: GameSettings})
    private mediumDifficultyLevel: GameSettings | null = null

    @property({type: GameSettings})
    private hardDifficultyLevel: GameSettings | null = null

    public getDifficultyLevelsList(): GameSettings[] {
        if (this.easyDifficultyLevel === null) throw new ErrorMessage('GameSettings').notDefined
        if (this.mediumDifficultyLevel === null) throw new ErrorMessage('GameSettings').notDefined
        if (this.hardDifficultyLevel === null) throw new ErrorMessage('GameSettings').notDefined

        return [this.easyDifficultyLevel, this.mediumDifficultyLevel, this.hardDifficultyLevel]
    }
}


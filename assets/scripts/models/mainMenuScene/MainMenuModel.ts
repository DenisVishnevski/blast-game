import { _decorator, Component, Node } from 'cc';
import { GameSettings } from '../GameSettings';
const { ccclass, property } = _decorator;
@ccclass('MainMenuModel')
export class MainMenuModel extends Component {
    @property({type: GameSettings})
    private easyDifficultyLevel: GameSettings = null

    @property({type: GameSettings})
    private mediumDifficultyLevel: GameSettings = null

    @property({type: GameSettings})
    private hardDifficultyLevel: GameSettings = null

    public getDifficultyLevelsList(): GameSettings[] {
        return [this.easyDifficultyLevel, this.mediumDifficultyLevel, this.hardDifficultyLevel]
    }
}


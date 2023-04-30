import { _decorator, Component, Node } from 'cc';
import { IDifficultySetting } from '../IDifficultySetting';
import { DifficultySettingModel } from './DifficultySettingModel';
const { ccclass, property } = _decorator;
@ccclass('MainMenuModel')
export class MainMenuModel extends Component {
    @property({type: DifficultySettingModel})
    private easyDifficultyLevel: IDifficultySetting = null

    @property({type: DifficultySettingModel})
    private mediumDifficultyLevel: IDifficultySetting = null

    @property({type: DifficultySettingModel})
    private hardDifficultyLevel: IDifficultySetting = null

    public getDifficultyLevelsList(): IDifficultySetting[] {
        return [this.easyDifficultyLevel, this.mediumDifficultyLevel, this.hardDifficultyLevel]
    }
}


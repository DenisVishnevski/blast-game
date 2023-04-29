import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenuModel')
export class MainMenuModel extends Component {
    @property
    private easyDifficulty: number = 0

    @property
    private mediumDifficulty: number = 0

    @property
    private hardDifficulty: number = 0

    public getDifficultySettingsList(): number[] {
        return [this.easyDifficulty, this.mediumDifficulty, this.hardDifficulty]
    }
}


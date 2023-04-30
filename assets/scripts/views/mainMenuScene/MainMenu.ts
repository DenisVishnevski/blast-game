import { _decorator, Component, Node } from 'cc';
import { DifficultySetting } from './DifficultySetting';
import { IDifficultySetting } from '../../models/IDifficultySetting';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    @property({type: Node})
    private playButton: Node = null;

    @property({type: Node})
    private difficultySelectionMenu: Node = null;

    public initDifficultySettingsButton(difficultyLevels: IDifficultySetting[]): void {
        difficultyLevels.forEach((difficultyLevel: IDifficultySetting, index) => {
            const difficultySelectionMenu = this.node.getChildByName('DifficultySelectionMenu');
            const difficultySetting = difficultySelectionMenu.getChildByName('DifficultySettingButton-' + index.toString());

            if (difficultySetting) {
                difficultySetting.getComponent(DifficultySetting).setValue(difficultyLevel);
            }
        });
    }

    private openDifficultySelectionMenu(): void {
        this.playButton.active = false;
        this.difficultySelectionMenu.active = true;
    }
}


import { _decorator, Component, Node } from 'cc';
import { DifficultySetting } from './DifficultySetting';
import { GameSettings } from '../../models/GameSettings';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    @property({type: Node})
    private playButton: Node | null = null;

    @property({type: Node})
    private difficultySelectionMenu: Node | null = null;

    public initDifficultySettingsButton(difficultyLevels: GameSettings[]): void {
        difficultyLevels.forEach((difficultyLevel: GameSettings, index) => {
            const difficultySelectionMenu = this.node.getChildByName('DifficultySelectionMenu');
            if (difficultySelectionMenu === null) throw new ErrorMessage('DifficultySelectionMenu').notFound
            const difficultySettingNode = difficultySelectionMenu.getChildByName('DifficultySettingButton-' + index.toString());

            if (difficultySettingNode) {
                const difficultySetting = difficultySettingNode.getComponent(DifficultySetting)
                if (difficultySetting === null) throw new ErrorMessage('DifficultySetting').notAdded

                difficultySetting.setValue(difficultyLevel);
            }
        });
    }

    private openDifficultySelectionMenu(): void {
        if (this.playButton === null) throw new ErrorMessage('PlayButton').notAdded
        if (this.difficultySelectionMenu === null) throw new ErrorMessage('DifficultySelectionMenu').notAdded

        this.playButton.active = false;
        this.difficultySelectionMenu.active = true;
    }
}


import { _decorator, Component, Node } from 'cc';
import { DifficultySetting } from './DifficultySetting';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    @property({type: Node})
    private playButton: Node = null;

    @property({type: Node})
    private difficultySelectionMenu: Node = null;

    public initDifficultySettingsButton(tilesContainerSizesList: number[]): void {
        tilesContainerSizesList.forEach((tilesContainerSize: number, index) => {
            const difficultySelectionMenu = this.node.getChildByName('DifficultySelectionMenu');
            const difficultySetting = difficultySelectionMenu.getChildByName('DifficultySettingButton-' + index.toString());

            if (difficultySetting) {
                difficultySetting.getComponent(DifficultySetting).setValue(tilesContainerSize);
            }
        });
    }

    private openDifficultySelectionMenu(): void {
        this.playButton.active = false;
        this.difficultySelectionMenu.active = true;
    }
}


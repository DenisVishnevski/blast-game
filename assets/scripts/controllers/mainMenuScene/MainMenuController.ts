import { _decorator, Component, director, Node } from 'cc';
import { MainMenuModel } from '../../models/mainMenuScene/MainMenuModel';
import { MainMenu } from '../../views/mainMenuScene/MainMenu';
import { EventsController } from '../EventsController';
import { GlobalSettings } from '../../models/GlobalSettings';
import { IDifficultySetting } from '../../models/IDifficultySetting';
const { ccclass, property } = _decorator;

@ccclass('mainMenuController')
export class mainMenuController extends Component {
    @property({ type: MainMenu })
    private mainMenu: MainMenu = null;

    @property({ type: MainMenuModel })
    private mainMenuModel: MainMenuModel = null;

    protected start(): void {
        const eventTarget = this.getComponent(EventsController).getEventTarget();
        eventTarget.on('onStartGame', this.startGame, this);

        this.mainMenu.initDifficultySettingsButton(this.mainMenuModel.getDifficultyLevelsList());
    }

    private startGame(difficultyLevel: IDifficultySetting): void {
        GlobalSettings.setTilesContainerSize(difficultyLevel.getTilesContainerSize());
        GlobalSettings.setClicksCount(difficultyLevel.getClicksCount());
        GlobalSettings.setTotalPointsCount(difficultyLevel.getTotalPointsCount());

        GlobalSettings.setResetsCount(difficultyLevel.getResetsCount());
        director.loadScene('scene.gameplayScene');
    }
}


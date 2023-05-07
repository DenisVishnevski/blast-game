import { _decorator, Component, director, Node } from 'cc';
import { MainMenuModel } from '../../models/mainMenuScene/MainMenuModel';
import { MainMenu } from '../../views/mainMenuScene/MainMenu';
import { EventsController } from '../EventsController';
import { GlobalSettings } from '../../models/GlobalSettings';
import { GameSettings } from '../../models/GameSettings';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('mainMenuController')
export class mainMenuController extends Component {
    @property({ type: MainMenu })
    private mainMenu: MainMenu | null = null;

    @property({ type: MainMenuModel })
    private mainMenuModel: MainMenuModel | null = null;

    protected onLoad(): void {
        const eventsController = this.getComponent(EventsController)
        if (eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.mainMenu === null) throw new ErrorMessage('MainMenu').notDefined
        if (this.mainMenuModel === null) throw new ErrorMessage('MainMenuModel').notDefined

        eventsController.getEventTarget().on('onStartGame', this.startGame, this);
        this.mainMenu.initDifficultySettingsButton(this.mainMenuModel.getDifficultyLevelsList());
    }

    private startGame(difficultyLevel: GameSettings): void {
        GlobalSettings.setTilesContainerSize(difficultyLevel.getTilesContainerSize());
        GlobalSettings.setClicksCount(difficultyLevel.getClicksCount());
        GlobalSettings.setTotalPointsCount(difficultyLevel.getTotalPointsCount());

        GlobalSettings.setBombsCount(difficultyLevel.getBombsCount());
        GlobalSettings.setTeleportsCount(difficultyLevel.getTeleportsCount());
        GlobalSettings.setResetsCount(difficultyLevel.getResetsCount());

        if (this.mainMenu === null) throw new ErrorMessage('MainMenu').notDefined
        this.mainMenu.loading();

        director.loadScene('scene.gameplayScene');
    }

    protected onDestroy(): void {
        const eventsController = this.getComponent(EventsController)
        if (eventsController === null) throw new ErrorMessage('EventsController').notAdded

        eventsController.getEventTarget().off('onStartGame', this.startGame, this);
    }
}


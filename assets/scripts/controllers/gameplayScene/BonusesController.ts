import { _decorator, Component, Node } from 'cc';
import { EventsController } from '../EventsController';
import { BonusesPanel } from '../../views/gameplayScene/BonusesPanel';
import { ContainerModel } from '../../models/gameplayScene/ContainerModel';
import { BonusesHandlerModel } from '../../models/gameplayScene/BonusesHandlerModel';
const { ccclass, property } = _decorator;

@ccclass('BonusesController')
export class BonusesController extends Component {
    @property({ type: BonusesPanel })
    private bonusesPanel: BonusesPanel = null;

    @property({ type: BonusesHandlerModel })
    private bonusesHandlerModel: BonusesHandlerModel = null;

    @property({ type: ContainerModel })
    private containerModel: ContainerModel = null;

    private eventsController: EventsController = null;

    protected onLoad(): void {
        this.eventsController = this.getComponent(EventsController);
        this.eventsController.getEventTarget().on('onUseReset', this.bonusesPanel.setResetsCount, this.bonusesPanel);
        this.eventsController.getEventTarget().on('onUseBomb', this.bonusesPanel.setBombsCount, this.bonusesPanel);
    }

    public useBomb(): void {
        this.pauseDefaultScript();
        this.eventsController.getEventTarget().on('onTileClick', this.bonusesHandlerModel.useBomb, this.bonusesHandlerModel);
    }

    public runDefaultScript(): void {
        this.eventsController.getEventTarget().off('onTileClick', this.bonusesHandlerModel.useBomb, this.bonusesHandlerModel);
        
        this.eventsController.getEventTarget().on('onTileClick', this.containerModel.handleTile, this.containerModel);
    }

    private pauseDefaultScript(): void {
        this.eventsController.getEventTarget().off('onTileClick', this.containerModel.handleTile, this.containerModel);
    }
}


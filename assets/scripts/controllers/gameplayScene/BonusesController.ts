import { _decorator, Component, Node } from 'cc';
import { EventsController } from '../EventsController';
import { BonusesPanel } from '../../views/gameplayScene/BonusesPanel';
import { ContainerModel } from '../../models/gameplayScene/ContainerModel';
import { BonusesHandlerModel } from '../../models/gameplayScene/BonusesHandlerModel';
import { TeleportButton } from '../../views/gameplayScene/TeleportButton';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('BonusesController')
export class BonusesController extends Component {
    @property({ type: BonusesPanel })
    private bonusesPanel: BonusesPanel | null = null;

    @property({ type: BonusesHandlerModel })
    private bonusesHandlerModel: BonusesHandlerModel | null = null;

    @property({ type: ContainerModel })
    private containerModel: ContainerModel | null = null;

    private eventsController: EventsController | null = null;

    protected onLoad(): void {
        this.eventsController = this.getComponent(EventsController);
        if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.bonusesPanel === null) throw new ErrorMessage('BonusesPanel').notDefined
          
        this.eventsController.getEventTarget().on('onUseBomb', this.bonusesPanel.setBombsCount, this.bonusesPanel);

        this.eventsController.getEventTarget().on('onUseTeleport', this.bonusesPanel.setTeleportsCount, this.bonusesPanel);
        this.eventsController.getEventTarget().on('onSelectTile', this.bonusesPanel.displayTile, this.bonusesPanel);

        this.eventsController.getEventTarget().on('onUseReset', this.bonusesPanel.setResetsCount, this.bonusesPanel);
    }

    public useBomb(): void {
        if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.bonusesHandlerModel === null) throw new ErrorMessage('BonusesHandlerModel').notDefined

        this.pauseDefaultScript();
        this.eventsController.getEventTarget().on('onTileClick', this.bonusesHandlerModel.useBomb, this.bonusesHandlerModel);
    }

    public useTeleport(): void {
        if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.bonusesHandlerModel === null) throw new ErrorMessage('BonusesHandlerModel').notDefined

        this.pauseDefaultScript();
        this.eventsController.getEventTarget().on('onTileClick', this.bonusesHandlerModel.useTeleport, this.bonusesHandlerModel);
    }

    public cancelTeleport(): void {
        if (this.bonusesHandlerModel === null) throw new ErrorMessage('BonusesHandlerModel').notDefined
        this.bonusesHandlerModel.cancelTeleport();
    }

    public runDefaultScript(): void {
        if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.bonusesHandlerModel === null) throw new ErrorMessage('BonusesHandlerModel').notDefined
        if (this.containerModel === null) throw new ErrorMessage('ContainerModel').notDefined
        
        this.eventsController.getEventTarget().off('onTileClick', this.bonusesHandlerModel.useBomb, this.bonusesHandlerModel);
        this.eventsController.getEventTarget().off('onTileClick', this.bonusesHandlerModel.useTeleport, this.bonusesHandlerModel);
        
        this.eventsController.getEventTarget().on('onTileClick', this.containerModel.handleTile, this.containerModel);
    }

    private pauseDefaultScript(): void {
        if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.containerModel === null) throw new ErrorMessage('ContainerModel').notDefined

        this.eventsController.getEventTarget().off('onTileClick', this.containerModel.handleTile, this.containerModel);
    }
}


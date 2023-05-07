import { _decorator, Component, Node } from 'cc';
import { EventsController } from '../EventsController';
import { BonusesPanel } from '../../views/gameplayScene/BonusesPanel';
import { ContainerModel } from '../../models/gameplayScene/ContainerModel';
import { BonusesHandlerModel } from '../../models/gameplayScene/BonusesHandlerModel';
import { ErrorMessage } from '../../utils/ErrorMessage';
import { TeleportButton } from '../../views/gameplayScene/TeleportButton';
const { ccclass, property } = _decorator;

@ccclass('BonusesController')
export class BonusesController extends Component {
    @property({ type: BonusesPanel })
    private bonusesPanel: BonusesPanel | null = null;

    @property({ type: TeleportButton })
    private teleportButton: TeleportButton | null = null;

    @property({ type: BonusesHandlerModel })
    private bonusesHandlerModel: BonusesHandlerModel | null = null;

    @property({ type: ContainerModel })
    private containerModel: ContainerModel | null = null;

    private eventsController: EventsController | null = null;

    protected onLoad(): void {
        this.eventsController = this.getComponent(EventsController);
        if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.bonusesPanel === null) throw new ErrorMessage('BonusesPanel').notDefined
        if (this.teleportButton === null) throw new ErrorMessage('TeleportButton').notDefined

        this.eventsController.getEventTarget().on('onTakeBomb', this.takeBomb, this);
        this.eventsController.getEventTarget().on('onDropBomb', this.runDefaultScript, this);
        this.eventsController.getEventTarget().on('onUseBomb', this.bonusesPanel.setBombsCount, this.bonusesPanel);

        this.eventsController.getEventTarget().on('onTakeTeleport', this.takeTeleport, this);
        this.eventsController.getEventTarget().on('onDropTeleport', this.cancelTeleport, this);
        this.eventsController.getEventTarget().on('onUseTeleport', this.useTeleport , this);
        this.eventsController.getEventTarget().on('onSelectTile', this.teleportButton.displayTile, this.teleportButton);

        this.eventsController.getEventTarget().on('onUseReset', this.bonusesPanel.setResetsCount, this.bonusesPanel);
    }
   
    private takeBomb(): void {
        if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.bonusesHandlerModel === null) throw new ErrorMessage('BonusesHandlerModel').notDefined

        this.pauseDefaultScript();
        this.eventsController.getEventTarget().on('onTileClick', this.bonusesHandlerModel.useBomb, this.bonusesHandlerModel);
    }

    private takeTeleport(): void {
        if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.bonusesHandlerModel === null) throw new ErrorMessage('BonusesHandlerModel').notDefined

        this.pauseDefaultScript();
        this.eventsController.getEventTarget().on('onTileClick', this.bonusesHandlerModel.useTeleport, this.bonusesHandlerModel);
    }

    private useTeleport(usesCount: number): void {
        if (this.bonusesPanel === null) throw new ErrorMessage('BonusesPanel').notDefined

        this.bonusesPanel.setTeleportsCount(usesCount);
        this.teleportButton?.dropTeleport();
    }

    private cancelTeleport(): void {
        if (this.bonusesHandlerModel === null) throw new ErrorMessage('BonusesHandlerModel').notDefined
        this.bonusesHandlerModel.cancelTeleport();
        this.runDefaultScript();
    }

    private runDefaultScript(): void {
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

    protected onDestroy(): void {
        this.eventsController = this.getComponent(EventsController);
        if (this.eventsController === null) throw new ErrorMessage('EventsController').notAdded
        if (this.bonusesPanel === null) throw new ErrorMessage('BonusesPanel').notDefined
        if (this.teleportButton === null) throw new ErrorMessage('TeleportButton').notDefined
        
        this.eventsController.getEventTarget().off('onTakeBomb', this.takeBomb, this);
        this.eventsController.getEventTarget().off('onDropBomb', this.runDefaultScript, this);
        this.eventsController.getEventTarget().off('onUseBomb', this.bonusesPanel.setBombsCount, this.bonusesPanel);
        this.eventsController.getEventTarget().off('onTakeTeleport', this.takeTeleport, this);
        this.eventsController.getEventTarget().off('onDropTeleport', this.cancelTeleport, this);
        this.eventsController.getEventTarget().off('onUseTeleport', this.useTeleport , this);
        this.eventsController.getEventTarget().off('onSelectTile', this.teleportButton.displayTile, this.teleportButton);
        this.eventsController.getEventTarget().off('onUseReset', this.bonusesPanel.setResetsCount, this.bonusesPanel);
    }
}


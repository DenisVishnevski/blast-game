import { _decorator, Component, Node } from 'cc';
import { EventsController } from '../EventsController';
import { BonusesPanel } from '../../views/gameplayScene/BonusesPanel';
const { ccclass, property } = _decorator;

@ccclass('BonusesController')
export class BonusesController extends Component {
    @property({ type: BonusesPanel })
    private bonusesPanel: BonusesPanel = null;

    protected start(): void {
        const eventTarget = this.getComponent(EventsController).getEventTarget();
        eventTarget.on('onUseReset', this.bonusesPanel.setResetsCount, this.bonusesPanel);
    }
}


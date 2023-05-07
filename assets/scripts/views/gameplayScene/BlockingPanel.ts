import { _decorator, Button, Component, Node } from 'cc';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('BlockingPanel')
export class BlockingPanel extends Component {
    private panel: Button | null = null

    private isLock: boolean = false;

    protected start(): void {
        this.panel = this.getComponent(Button)
    }

    public enableForWhile(cooldownTime: number): void {
        this.enable();
        this.scheduleOnce(this.disable, cooldownTime);
    }

    public enableForever(): void {
        this.enable();
        this.isLock = true
    }

    private enable(): void {
        if (this.panel === null) throw new ErrorMessage('Button').notAdded
        this.panel.onEnable();
    }

    private disable(): void {
        if (this.panel === null) throw new ErrorMessage('Button').notAdded
        if (this.isLock === false) {
            this.panel.onDisable();
        }
    }

}

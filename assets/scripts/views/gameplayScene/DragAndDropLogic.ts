import { _decorator, Component, EventMouse, Input, Node, Vec3 } from 'cc';
import { ErrorMessage } from '../../utils/ErrorMessage';
const { ccclass, property } = _decorator;

@ccclass('DragAndDropLogic')
export class DragAndDropLogic extends Component {
    @property({ type: Node })
    private canvas: Node | null = null;

    @property({ type: Node })
    private usedObject: Node | null = null;

    public drag(): void {
        if (this.canvas === null) throw new ErrorMessage('canvas').notDefined
        this.canvas.on(Input.EventType.MOUSE_MOVE, this.move, this);
    }

    public drop(): void {
        if (this.canvas === null) throw new ErrorMessage('canvas').notDefined
        if (this.usedObject === null) throw new ErrorMessage('used object').notDefined

        this.canvas.off(Input.EventType.MOUSE_MOVE, this.move, this);
        this.usedObject.setPosition(new Vec3());
    }

    private move(event: EventMouse): void {
        if (this.usedObject === null) throw new ErrorMessage('used object').notDefined
        const position = event.getUILocation();
        this.usedObject.setWorldPosition(new Vec3(position.x, position.y, 0));
    }
}


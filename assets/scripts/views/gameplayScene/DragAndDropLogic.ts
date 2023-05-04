import { _decorator, Component, EventMouse, Input, instantiate, Node, Prefab, Size, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DragAndDropLogic')
export class DragAndDropLogic extends Component {
    @property({ type: Node })
    private canvas: Node = null;

    @property({ type: Node })
    private usedObject: Node = null;

    public drag(): void {
        this.canvas.on(Input.EventType.MOUSE_MOVE, this.move, this);
    }

    public drop(): void {
        this.canvas.off(Input.EventType.MOUSE_MOVE, this.move, this);
        this.usedObject.setPosition(new Vec3());
    }

    private move(event): void {
        const position = event.getUILocation();
        this.usedObject.setWorldPosition(new Vec3(position.x, position.y, 0));
    }
}


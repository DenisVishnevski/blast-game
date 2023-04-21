import { _decorator, Component, EventTarget, Node } from 'cc';
const { ccclass, property } = _decorator;
const eventTarget = new EventTarget();

@ccclass('EventsController')
export class EventsController extends Component {
    public getEventTarget(): EventTarget {
        return eventTarget
    }
}


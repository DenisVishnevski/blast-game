import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverController')
export class GameOverController extends Component {
    private retry(): void {
        director.loadScene('scene.gameplayScene');
    }

    private exitToMainMenu(): void {
        director.loadScene('scene.mainMenu');
    }
}


///<reference path="../Notifications.ts"/>

namespace views {
    export class GameView extends PIXI.Container {
        constructor() {
            super();
            const background = PIXI.Sprite.fromImage("./assets/background.png");
            this.addChild(background);
        }
    }
}

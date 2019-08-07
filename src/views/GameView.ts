///<reference path="../Notifications.ts"/>

namespace views {
    export class GameView extends PIXI.Container {
        constructor() {
            super();
            this.addChild(PIXI.Sprite.from("background"));
        }
    }
}

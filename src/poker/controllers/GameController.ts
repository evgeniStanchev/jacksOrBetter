///<reference path="../views/GameView.ts"/>
///<reference path="../Notifications.ts"/>

namespace poker.controllers {
    import GameView = poker.view.GameView;
    import Notifications = poker.Notifications;

    export class GameController extends Pluck.ViewController {
        private readonly _app: PIXI.Application;

        constructor() {
            super(new GameView());
            this._app = new PIXI.Application({
                height: window.innerHeight,
                width: window.innerWidth,
            });
            this._app.stage.addChild(this._view);
        }

        getInterests(): string[] {
            return [Notifications.RESOURCES_LOADED];
        }

        handleNotification(note: Pluck.Notification) {
            switch (note.name) {
                case Notifications.RESOURCES_LOADED:
                    this.addControllers();
                    break;
            }
        }

        private addControllers(): void {
            const cardsController = new CardsController();
            this.addChildViewController(cardsController);
        }
    }
}

///<reference path="../views/GameView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../models/GameModel.ts"/>
///<reference path="../controllers/CardsController.ts"/>

namespace poker.controllers {
    import GameView = poker.view.GameView;
    import Notifications = poker.Notifications;
    import GameModel = poker.model.GameModel;
    import CardsController = poker.controllers.CardsController;

    export class GameController extends Pluck.ViewController {
        private _app: PIXI.Application;
        private _cardsControler: CardsController;

        constructor() {
            super(new GameView(), new GameModel());
            this.init();
           
        }

        private init(): void {
            this._app = new PIXI.Application({
                width: 1280,
                height: 720,
            });
            this._app.stage.addChild(this._view);
            document.getElementById("display-port").appendChild(this._app.view);
            this._cardsControler = new CardsController();
            this._view.addChild(this._cardsControler.view);
        }

        getInterests(): string[] {
            return [Notifications.RESOURCES_LOADED];
        }

        handleNotification(note: Pluck.Notification) {
            switch (
                note.name
                // case Notifications.RESOURCES_LOADED:
                //     this.addControllers();
                //     break;
            ) {
            }
        }

        addControllers(): void {
            const cardsController = new CardsController();
            this.addChildViewController(cardsController);
        }
    }
}
